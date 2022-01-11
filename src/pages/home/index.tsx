import type { NextPage } from "next";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Home: NextPage = () => {
  const { currentUser, login, logout } = useAuth();
  const handleLoginButton = () => {
    login && login();
  };
  const handleLogoutButton = () => {
    logout && logout();
  };

  //   useEffect(() => {
  //     return auth.onAuthStateChanged((user) => {
  //       router.push("/chats/m6s2o6brCyEsXBRxhS3M");
  //     });
  //   }, [router]);
  return (
    <div>
      <Head>
        <title>home</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {currentUser ? (
          <div>
            <button onClick={handleLogoutButton}>ログアウト</button>
            {currentUser.photoURL && (
              <Image
                src={currentUser.photoURL}
                alt=""
                width="100"
                height="100"
              />
            )}
            <Link href="/room/m6s2o6brCyEsXBRxhS3M">
              <a>m6s2o6brCyEsXBRxhS3M</a>
            </Link>
            <div></div>
            <Link href="/room/list">
              <a>room/list</a>
            </Link>
          </div>
        ) : (
          <button onClick={handleLoginButton}>signin</button>
        )}
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
