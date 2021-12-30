import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { auth } from "./firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithRedirect } from "firebase/auth";

interface User {
  displayName: string | null | undefined;
  email: string | null | undefined;
  photoUrl?: string | null | undefined;
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
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
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
