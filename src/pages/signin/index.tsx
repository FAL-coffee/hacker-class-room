import { useAuth } from "@/AuthContext";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
const Signin = () => {
  const { currentUser, login, logout } = useAuth();
  const router = useRouter();
  const handleLoginButton = () => {
    if (!login) return;
    login()
      .then((res) => {})
      .catch(() => {});
  };

  const handleLogoutButton = () => {
    if (!logout) return;
    logout()
      .then((res) => {})
      .catch(() => {});
  };
  return (
    <div>
      <h1>Hello, next-auth</h1>
      {currentUser && (
        <div>
          <h2>ログインしています.</h2>
          <button onClick={handleLogoutButton}>ログアウト</button>
          {currentUser.uid}
          {!!currentUser.photoURL && (
            <Image src={currentUser.photoURL} alt="" width="100" height="100" />
          )}
          <Link href="/chats/m6s2o6brCyEsXBRxhS3M">
            <a>chat</a>
          </Link>
        </div>
      )}
      {!currentUser && (
        <div>
          <h2>ログインしていません.</h2>
          <button onClick={handleLoginButton}>ログイン</button>
        </div>
      )}
    </div>
  );
};

export default Signin;
