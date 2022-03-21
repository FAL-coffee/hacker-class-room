import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useAuth } from "@/context/Auth/AuthContext";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { db, doc, getDoc } from "@/plugin/firebase";
import { Layout } from "@components/layout";
import { ChatRoomList } from "@components/templates";
import { ChatRoomCardList, ChatRoomBarList } from "@components/organisms";
import { useBelongRooms } from "@hooks";

import { IUser } from "@types";
import { converter } from "@/utils/firebase";
import * as routes from "@routes";

const RoomList: NextPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [belongRooms, loading, doFetchBelongRooms] = useBelongRooms();
  // const [chatRooms, setChatRooms] = useState<Array<IChatRoom>>([]);

  const handleOpenChatRoom = (id: string) => {
    router.push({
      pathname: `${routes.ROOM}/${id}`,
      query: { type: "chat" },
    });
  };

  const handleChatRoomSearch = (id: string) => {};

  const handleOpenProfile = (uid: string) => {
    // plofile/$idを表示する
    router.push(`${routes.PROFILE}/${uid}`);
  };

  useEffect(() => {
    if (!currentUser) return;
    // const tempRooms: IChatRoom[] = [];
    (async () => {
      // ログイン中のユーザー情報から、usersCollection内でのdocumentを特定する
      const currentUserRef = await doc(
        db,
        "users",
        `${currentUser.uid}`
      ).withConverter(converter<IUser>());
      // 特定したdocumentからデータを抽出する
      const currentUserSnap = await getDoc(currentUserRef);
      doFetchBelongRooms(currentUserSnap);
    })();
  }, [currentUser, doFetchBelongRooms]);

  const chatRoomListProps = {
    chatRooms: belongRooms,
    onOpenClick: handleOpenChatRoom,
    onTagClick: handleChatRoomSearch,
    onUserClick: handleOpenProfile,
  };
  return (
    <Layout title="chat list">
      {!!currentUser ? (
        <>
          {!loading && (
            <ChatRoomList
              ChatRoomListDisplayArea={
                <Box>
                  <Box sx={{ display: { xs: "none", md: "block" }, m: 1 }}>
                    <ChatRoomCardList {...chatRoomListProps} />
                  </Box>
                  <Box sx={{ display: { xs: "block", md: "none" }, m: 1 }}>
                    <ChatRoomBarList {...chatRoomListProps} />
                  </Box>
                </Box>
              }
            />
          )}
        </>
      ) : (
        <p>
          ログインすると、デフォルトで参加可能なチャットルームを表示できます
        </p>
      )}
    </Layout>
  );
};

export default RoomList;
