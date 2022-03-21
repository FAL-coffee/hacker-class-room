import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithRedirect } from "firebase/auth";
import {
  auth,
  db,
  addDoc,
  setDoc,
  doc,
  collection,
  updateDoc,
  getDoc,
} from "@/plugin/firebase";
import {
  IUser,
  F_ILoginRecord,
  F_IFollow,
  F_IFollower,
  F_IBelongRoom,
} from "@types";
import { converter } from "@/utils/firebase";
import * as settings from "@/constants/settings";

import { AuthContextProps, Props } from "./types";
import { DEFAULT_BELONG_ROOMS } from "./settings";

const AuthContext = createContext<AuthContextProps>({ currentUser: null });

export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * β版ではユーザーには事前用意したデフォルトルームにのみ加入させる。
 * (その後、βではユーザーの操作によるルームへの加入は不可)
 */

const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const login = () => {
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(auth, provider);
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user as IUser);
      setLoading(false);
      if (!user) return;
      // login時、firestore内のuser情報をuidをキーにし、登録を行う。
      const docRef = doc(db, "users", `${user.uid}`).withConverter(
        converter<IUser>()
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          photoURL: !!user.photoURL ? user.photoURL : settings.NULL,
          lastLoginAt: new Date(),
        });
      } else {
        await setDoc(docRef, {
          uid: user.uid,
          displayName: !!user.displayName ? user.displayName : settings.NULL,
          email: !!user.email ? user.email : settings.NULL,
          photoURL: !!user.photoURL ? user.photoURL : settings.NULL,
          lastLoginAt: new Date(),
          // belongRooms: defaultBelongRooms,
        });

        // login userのfollows collectionに公式アカウントを追加
        await setDoc(
          await doc(
            db,
            "users",
            `${user.uid}`,
            "follows",
            `${process.env.NEXT_PUBLIC_OFFICIAL_ACCOUNT_UID}`
          ).withConverter(converter<F_IFollow>()),
          {
            user: doc(
              db,
              `users/${process.env.NEXT_PUBLIC_OFFICIAL_ACCOUNT_UID}`
            ),
            followAt: new Date(),
          }
        );

        // 公式アカウントのfollowers collectionにlogin userを追加
        await setDoc(
          await doc(
            db,
            "users",
            `${process.env.NEXT_PUBLIC_OFFICIAL_ACCOUNT_UID}`,
            "followers",
            `${user.uid}`
          ).withConverter(converter<F_IFollower>()),
          {
            user: doc(db, `users/${user.uid}`),
            followedAt: new Date(),
          }
        );

        // デフォルトで所属するルームをcollectionとして作成
        DEFAULT_BELONG_ROOMS.forEach(async (roomRef) => {
          await addDoc(
            await collection(
              db,
              "users",
              `${user.uid}`,
              "belongRooms"
            ).withConverter(converter<F_IBelongRoom>()),
            {
              room: roomRef,
              joinAt: new Date(),
            }
          );

          await addDoc(await collection(roomRef, "members"), {
            user: doc(db, `users/${user.uid}`),
            joinAt: new Date(),
          });
        });
      }

      // login日時をdocumentを追加する形で記録していく
      await addDoc(
        await collection(
          db,
          "users",
          `${user.uid}`,
          "loginRecords"
        ).withConverter(converter<F_ILoginRecord>()),
        {
          loginAt: new Date(),
          // login時のipアドレスとかの取得については、規約の整備後
        }
      );
    });
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
