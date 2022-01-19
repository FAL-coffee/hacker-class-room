import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { db, doc, getDoc } from "@/plugin/firebase";
import { IChatRoom, IUser } from "@types";
import { Layout } from "@components/layout";
import { ChatRoomList } from "@components/templates";
import { ChatRoomCardList } from "@components/organisms";

const RoomList: NextPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [chatRooms, setChatRooms] = useState<Array<IChatRoom>>([]);

  const chatRoomOpenHandler = (id: string) => {
    router.push(`/room/${id}`);
  };

  useEffect(() => {
    if (!currentUser) return;
    const tempRooms: IChatRoom[] = [];
    (async () => {
      // ログイン中のユーザー情報から、usersCollection内でのdocumentを特定する
      const currentUserRef = await doc(db, "users", `${currentUser.uid}`);
      // 特定したdocumentからデータを抽出する
      const currentUserSnap = await getDoc(currentUserRef);
      const currentUserData = currentUserSnap.data() as IUser;

      // ルーム所属を示すフィールドの型アサーション
      if (!currentUserData.belongRooms) return;

      // ルーム所属（ルームidの配列）を元に、所属ルームを配列に格納する
      await currentUserData.belongRooms.map(async (roomRef) => {
        const roomSnap = await getDoc(roomRef);
        const roomData = await roomSnap.data();
        if (!roomData) return;
        const ownerSnap = await getDoc(roomData.owner);
        const ownerData = await ownerSnap.data();
        await tempRooms.push({
          id: roomRef.id,
          owner: ownerData as IUser,
          ...roomData,
        } as IChatRoom);
        await setChatRooms([...tempRooms]);
      });
    })();
  }, [currentUser]);

  return (
    <Layout title="chat list">
      {!!currentUser ? (
        <ChatRoomList
          ChatRoomListDisplayArea={
            <ChatRoomCardList
              chatRooms={chatRooms}
              onOpenClick={chatRoomOpenHandler}
            />
          }
        />
      ) : (
        <p>
          ログインすると、デフォルトで参加可能なチャットルームを表示できます
        </p>
      )}
    </Layout>
  );
};

export default RoomList;
