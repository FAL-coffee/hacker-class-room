import type { NextPage } from "next";
// import { useAuth } from "@/context/AuthContext";
import { Layout } from "@components/layout";
import React from "react";

const Home: NextPage = () => {
  // const { currentUser, login, logout } = useAuth();
  return (
    <Layout title="Profile">
      <h1>現在この画面は工事中です！( TДT)ｺﾞﾒﾝﾖｰ</h1>
      <p>Profile画面は、各ユーザーの情報の閲覧が可能なページです。</p>
      <p>
        活動記録や、公開メッセージ、所属しているルームリストや、連携しているSNSアカウントのリンク等を表示可能です。
      </p>
    </Layout>
  );
};

export default Home;
