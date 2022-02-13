import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { db, doc, getDoc } from "@/plugin/firebase";
import { Layout } from "@components/layout";
import { ChatRoomList } from "@components/templates";
import { ChatRoomCardList } from "@components/organisms";
import { useBelongRooms } from "@hooks";
import * as routes from "@routes";

const RoomList: NextPage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [belongRooms, setBelongRooms] = useBelongRooms();
  // const [chatRooms, setChatRooms] = useState<Array<IChatRoom>>([]);

  const chatRoomOpenHandler = (id: string) => {
    router.push(`${routes.ROOM}/${id}`);
  };

  useEffect(() => {
    if (!currentUser) return;
    // const tempRooms: IChatRoom[] = [];
    (async () => {
      // ログイン中のユーザー情報から、usersCollection内でのdocumentを特定する
      const currentUserRef = await doc(db, "users", `${currentUser.uid}`);
      // 特定したdocumentからデータを抽出する
      const currentUserSnap = await getDoc(currentUserRef);
      setBelongRooms(currentUserSnap);
    })();
  }, [currentUser, setBelongRooms]);

  return (
    <Layout title="chat list">
      {!!currentUser ? (
        <ChatRoomList
          ChatRoomListDisplayArea={
            <ChatRoomCardList
              chatRooms={belongRooms}
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
