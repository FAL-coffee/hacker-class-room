import { useAuth } from "@/AuthContext";
import React from "react";
const Signin = () => {
  const { currentUser, login, logout } = useAuth();
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
          {currentUser.photoUrl}
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
