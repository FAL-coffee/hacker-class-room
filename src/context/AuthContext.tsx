import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithRedirect } from "firebase/auth";
import {
  auth,
  db,
  setDoc,
  doc,
  // addDoc,
  updateDoc,
  getDoc,
  DocumentReference,
  Timestamp,
  // collection,
} from "@/plugin/firebase";
import { IUser } from "@types";

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
      const docRef = await doc(db, "users", `${user.uid}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          belongRooms: defaultBelongRooms,
        });
      } else {
        await setDoc(docRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
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
          ),
          {
            user: doc(
              db,
              `users/${process.env.NEXT_PUBLIC_OFFICIAL_ACCOUNT_UID}`
            ),
            followAt: Timestamp.now(),
            talk: null,
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
          ),
          {
            user: doc(db, `users/${user.uid}`),
            followedAt: Timestamp.now(),
            talk: null,
          }
        );
      }
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
