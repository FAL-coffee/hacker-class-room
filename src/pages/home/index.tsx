import type { NextPage } from "next";
// import { useAuth } from "@/context/AuthContext";
import { Layout } from "@components/layout";
import React from "react";

const Home: NextPage = () => {
  // const { currentUser, login, logout } = useAuth();
  return (
    <Layout title="HOME">
      <h1>現在この画面は工事中です！( TДT)ｺﾞﾒﾝﾖｰ</h1>
      <p>
        HOME画面は、あなただけのページとして、フォローしているユーザーの活動や、自分の連携しているＳＮＳの活動記録をチェック出来ます。
      </p>
    </Layout>
  );
};

export default Home;
