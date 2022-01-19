import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithRedirect } from "firebase/auth";
import {
  auth,
  db,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  DocumentReference,
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
  // doc(db, "chats/" + ""),
  // doc(db, "chats/" + ""),
  // doc(db, "chats/" + ""),
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
        });
      } else {
        await setDoc(docRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          belongRooms: defaultBelongRooms,
        });
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
