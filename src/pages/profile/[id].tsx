import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Layout } from "@components/layout";
import {
  db,
  doc,
  getDoc,
  DocumentReference,
  Timestamp,
  query,
  collection,
  where,
  getDocs,
  addDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "@/plugin/firebase";
import { IChatRoom, ITag, IUser } from "@types";
import { Profile } from "@components/templates";
import {
  ListTab,
  UserInformation,
  ChatRoomBarList,
  UserBarList,
} from "@/components/organisms";

interface ITempChatRoom {
  id: string;
  owner: DocumentReference;
  iconURL?: string;
  name: string;
  tags: string[];
  description: string;
  createdAt: Timestamp;
  messages?: DocumentReference;
}

const ProfilePage: NextPage = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<IUser>({
    displayName: "user is not found",
    email: "user is not found",
    uid: "404",
  });
  const [belongRooms, setBelongRooms] = useState<IChatRoom[]>([]);
  const [follows, setFollows] = useState<IUser[]>([]);
  const [followers, setFollowers] = useState<IUser[]>([]);
  const [following, setFollowing] = useState<boolean>(false);

  /**
   * 画面表示時処理
   * 1. routes.idからuidを持つuserを検索する
   *     見つからなかった場合、undefined値を代入する
   * 2. user.belongRoomsからroomの情報を取得する
   *      ( room取得時、tagsの取得も同時に行う。（tagsはdocRef配列） )
   * 3. user.followsからフォローリストを全件取得する
   * 4. user.followersからフォロワーリストを全件取得する
   *      ( 本番verでは件数制限を行い、「次の十件を取得」ボタンみたいなのを追加する )
   */
  const router = useRouter();
  useEffect(() => {
    setBelongRooms([]);
    setFollows([]);
    setFollowers([]);
    setFollowing(false);
    (async () => {
      // ログイン中のユーザー情報から、usersCollection内でのdocumentを特定する
      const userRef = await doc(db, "users", `${router.query.id}`);
      // 特定したdocumentからデータを抽出する
      const userSnap = await getDoc(userRef);
      const userSnapData = userSnap.data() as IUser;
      if (!userSnapData) return;
      setUserData(userSnapData);

      // user.belongRooms（DocumentData[]）を一件ずつ読み取り、dataを取得しbelongRooms(useState)に格納する
      if (!userSnapData.belongRooms) return;
      else if (!!userSnapData.belongRooms) {
        const tempBelongRooms: IChatRoom[] = [];
        userSnapData.belongRooms.map(
          async (belongRoomRef: DocumentReference, i: number) => {
            const belongRoomDoc = await getDoc(belongRoomRef);
            const tempBelongRoomData = belongRoomDoc.data() as ITempChatRoom;
            const belongRoomData: IChatRoom = {
              ...tempBelongRoomData,
              id: belongRoomRef.id,
              tags: [],
              owner: {
                displayName: "user is not found",
                email: "user is not found",
                uid: "404",
              },
            };
            // tagsの取得・格納
            if (!!tempBelongRoomData.tags) {
              await tempBelongRoomData.tags.map(
                async (tagId: string, j: number) => {
                  const tagRef = await doc(db, "tags", `${tagId}`);
                  const tagDoc = await getDoc(tagRef);
                  const tagData = tagDoc.data();
                  belongRoomData.tags.push({
                    id: tagRef.id,
                    value: tagData?.value,
                  } as ITag);
                }
              );
            }

            const ownerRef = tempBelongRoomData.owner;
            const ownerDoc = await getDoc(ownerRef);
            const ownerData = await ownerDoc.data();
            belongRoomData.owner = ownerData as IUser;

            tempBelongRooms.push(belongRoomData);
            setBelongRooms([...tempBelongRooms]);
          }
        );
      }

      // user.follows（DocumentData[]）を一件ずつ読み取り、dataを取得しfollows(useState)に格納する
      if (!userSnapData.follows) setFollows([]);
      else if (!!userSnapData.follows) {
        const tempFollows: IUser[] = [];
        await userSnapData.follows.map(
          async (followRef: DocumentReference, i: number) => {
            const followDoc = await getDoc(followRef);
            const followData = followDoc.data() as IUser;
            await tempFollows.push(followData);
            await setFollows([...tempFollows]);
          }
        );
      }

      // user.followers（DocumentData[]）を一件ずつ読み取り、dataを取得しfollowers(useState)に格納する
      if (!userSnapData.followers) setFollowers([]);
      else if (!!userSnapData.followers) {
        const tempFollowers: IUser[] = [];
        userSnapData.followers.map(
          async (followerRef: DocumentReference, i: number) => {
            const followerDoc = await getDoc(followerRef);
            const followerData = followerDoc.data() as IUser;
            await tempFollowers.push(followerData);
            await setFollowers([...tempFollowers]);
          }
        );
      }

      // 自身が該当userではない場合、該当userをfollowしているかをsetする
      if (!currentUser) return;
      if (currentUser.uid !== userSnapData.uid) {
        const currentUserRef = await doc(db, "users", `${currentUser.uid}`);
        const currentUserSnap = await getDoc(currentUserRef);
        setFollowing(
          currentUserSnap
            .data()
            ?.follows.some((v: { id: string }) => v.id === userSnapData.uid)
        );
      }
    })();
  }, [router.query.id, currentUser]);

  const handleUnFollow = async (uid: string) => {
    if (!currentUser) return;
    if (uid === currentUser.uid) return;
    // currentUser.followsから、userDataの参照を削除する
    const currentUserRef = await doc(db, "users", `${currentUser.uid}`);
    const currentUserSnap = await getDoc(currentUserRef);
    if (currentUserSnap.exists()) {
      await updateDoc(currentUserRef, {
        follows: arrayRemove(doc(db, "users", `${userData.uid}`)),
      });
    }

    // userData.followersから、currentUserの参照を削除する
    const targetUserRef = await doc(db, "users", `${userData.uid}`);
    const targetUserSnap = await getDoc(targetUserRef);
    if (targetUserSnap.exists()) {
      await updateDoc(targetUserRef, {
        followers: arrayRemove(doc(db, "users", `${currentUser.uid}`)),
      });
    }
    // reloadにより情報を最新化する
    router.reload();
  };

  const handleFollow = async (uid: string) => {
    if (!currentUser) return;
    if (uid === currentUser.uid) return;
    // currentUser.followsにuserDataの参照を追加する
    const currentUserRef = await doc(db, "users", `${currentUser.uid}`);
    const currentUserSnap = await getDoc(currentUserRef);
    if (currentUserSnap.exists()) {
      await updateDoc(currentUserRef, {
        follows: arrayUnion(doc(db, "users", `${userData.uid}`)),
      });
    }

    // userData.followersにcurrentUserの参照を追加する
    const targetUserRef = await doc(db, "users", `${userData.uid}`);
    const targetUserSnap = await getDoc(targetUserRef);
    if (targetUserSnap.exists()) {
      await updateDoc(targetUserRef, {
        followers: arrayUnion(doc(db, "users", `${currentUser.uid}`)),
      });
    }
    // reloadにより情報を最新化する
    router.reload();
  };

  const handleSendMessage = async (uid: string) => {
    if (uid === currentUser?.uid) return;
    /**
     *  chatRoom( chats/ )内に、type==="directMessage"、member = [ userData, currentUser ] の条件に当てはまる
     *   roomが存在する場合、該当するroomのidを取得・room/list/$id画面を表示する
     *  存在しなかった場合、type==="directMessage"、member = [ userData, currentUser ] の条件でroomを作成し、
     *   作成したroomのidを取得・room/list/$id画面を表示する
     */
    const chatsRef = collection(db, "chats");
    const q1 = query(
      chatsRef,
      where("type", "==", "directMessage"),
      where("members", "==", [uid, currentUser?.uid])
    );
    const q2 = query(
      chatsRef,
      where("type", "==", "directMessage"),
      where("members", "==", [currentUser?.uid, uid])
    );

    const querySnapshot1 = await getDocs(q1);
    const querySnapshot2 = await getDocs(q2);
    const querySnapshot =
      querySnapshot1.size > 0 ? querySnapshot1 : querySnapshot2;

    let directMessageChatRoomId: string = "";
    querySnapshot.forEach((doc) => {
      directMessageChatRoomId = doc.id;
    });

    if (querySnapshot.size > 0)
      return router.push(`/room/${directMessageChatRoomId}`);
    else {
      const dmRef = await addDoc(chatsRef, {
        name: `${currentUser?.displayName}と${userData.displayName}の会話`,
        description: "",
        members: [currentUser?.uid, uid],
        owner: doc(db, "users", `${currentUser?.uid}`),
        type: "directMessage",
      });
      return router.push(`/room/${dmRef.id}`);
    }
  };

  const handleOpenProfile = (uid: string) => {
    // plofile/$idを表示する
    router.push(`/profile/${uid}`);
  };

  const handleOpenChatRoom = (id: string) => {
    // /room/$idを表示する
    router.push(`/room/${id}`);
  };

  const handleChatRoomSearch = (id: string) => {
    // /room/searchを表示する。その時、検索条件を保持する。
    //  => &tagId=${id}みたいな感じで、パラメータとして渡すことが出来るのが理想
    // router.push({ pathname: "/room/search/", query: { tagIds: [id] } });
  };

  return (
    <Layout title="Profile">
      <Profile
        userInformationArea={
          <UserInformation
            user={userData}
            isMe={currentUser ? currentUser?.uid === userData.uid : false}
            // isMe={false}
            following={following}
            onUnFollowClick={handleUnFollow}
            onFollowClick={handleFollow}
            onSendMessageClick={handleSendMessage}
          />
        }
        listTabArea={
          <ListTab
            tabs={[
              {
                name: "follow",
                component: (
                  <UserBarList
                    users={follows}
                    onUserClick={handleOpenProfile}
                  />
                ),
              },
              {
                name: "follower",
                component: (
                  <UserBarList
                    users={followers}
                    onUserClick={handleOpenProfile}
                  />
                ),
              },
              {
                name: "room",
                component: (
                  <ChatRoomBarList
                    chatRooms={belongRooms}
                    onOpenClick={handleOpenChatRoom}
                    onTagClick={handleChatRoomSearch}
                  />
                ),
              },
            ]}
          />
        }
      />
    </Layout>
  );
};

export default ProfilePage;
