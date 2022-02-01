import type { NextPage } from "next";
// import { useAuth } from "@/context/AuthContext";
import { Layout } from "@components/layout";
import React from "react";
import { Profile } from "@components/templates";
// import {
//   ListTab,
//   UserInformation,
//   ChatRoomBarList,
//   UserBarList,
// } from "@/components/organisms";

const Home: NextPage = () => {
  // const { currentUser, login, logout } = useAuth();
  /**
   * profile画面でやること
   * 1. routes.idからuidを持つuserを検索する
   *     見つからなかった場合、undefined値を代入する
   * 2. user.belongRoomsからroomの情報を取得する
   *      ( room取得時、tagsの取得も同時に行う。（tagsはdocRef配列） )
   * 3. user.followsからフォローリストを全件取得する
   * 4. user.followersからフォロワーリストを全件取得する
   *      ( 本番verでは件数制限を行い、「次の十件を取得」ボタンみたいなのを追加する )
   */

  return (
    <Layout title="Profile">
      {/* <Profile listTabArea={} userInformationArea={} /> */}
    </Layout>
  );
};

export default Home;
