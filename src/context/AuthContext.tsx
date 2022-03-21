import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
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
  DocumentReference,
} from "@/plugin/firebase";
import { IUser, ILoginRecord, IFollow, IFollower } from "@types";
import { converter } from "@/utils/firebase";
import * as settings from "@/constants/settings";

interface AuthContextProps {
  currentUser: IUser | null | undefined;
  login?: () => Promise<void>;
  logout?: () => Promise<void>;
  loading?: Boolean;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({ currentUser: null });

export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * β版ではユーザーには事前用意したデフォルトルームにのみ加入させる。
 * (その後、βではユーザーの操作によるルームへの加入は不可)
 */
const defaultBelongRooms: DocumentReference[] = [
  doc(db, "chats/" + "1NDPnApW4DvWR8HvyvvZ"),
  doc(db, "chats/" + "ehV7kS3zRJ34Y6iWj4cz"),
];

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
      const docRef = await doc(db, "users", `${user.uid}`).withConverter(
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
          belongRooms: defaultBelongRooms,
        });
        // login userのfollows collectionに公式アカウントを追加
        await setDoc(
          await doc(
            db,
            "users",
            `${user.uid}`,
            "follows",
            `${process.env.NEXT_PUBLIC_OFFICIAL_ACCOUNT_UID}`
          ).withConverter(converter<IFollow>()),
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
          ).withConverter(converter<IFollower>()),
          {
            user: doc(db, `users/${user.uid}`),
            followedAt: new Date(),
          }
        );
      }

      // login日時をdocumentを追加する形で記録していく
      await addDoc(
        await collection(
          db,
          "users",
          `${user.uid}`,
          "loginRecords"
        ).withConverter(converter<ILoginRecord>()),
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
