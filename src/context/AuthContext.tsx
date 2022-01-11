import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithRedirect } from "firebase/auth";
import { auth, db, setDoc, doc, updateDoc, getDoc } from "@/plugin/firebase";

interface User {
  displayName: string | null | undefined;
  email: string | null | undefined;
  uid: string | null | undefined;
  photoURL?: string | null | undefined;
}
interface AuthContextProps {
  currentUser: User | null | undefined;
  login?: () => Promise<void>;
  logout?: () => Promise<void>;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({ currentUser: null });

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
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
      setCurrentUser(user);
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
        });
      }
    });
  }, []);

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <p>認証中...</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
