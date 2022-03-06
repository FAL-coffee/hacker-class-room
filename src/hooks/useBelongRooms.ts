import { useEffect, useState } from "react";
import {
  getDoc,
  DocumentReference,
  Timestamp,
  DocumentSnapshot,
} from "@/plugin/firebase";
import { IChatRoom, IUser } from "@types";

// interface ITagRef {
//   genreRef: DocumentReference;
//   tagRef: DocumentReference;
// }
interface ITempChatRoom {
  id: string;
  owner: DocumentReference;
  iconURL?: string;
  name: string;
  tags: DocumentReference[];
  description: string;
  createdAt: Timestamp;
  messages?: DocumentReference;
}

export const useBelongRooms = (): //   initialState?: DocumentSnapshot
[IChatRoom[], (userSnap?: DocumentSnapshot) => void] => {
  // const [tempBelongRooms, setTempBelongRooms] = useState<IChatRoom[]>([]);
  const [userSnap, setUserSnap] = useState<DocumentSnapshot>();
  const [belongRooms, setBelongRooms] = useState<IChatRoom[]>([]);
  useEffect(() => {
    if (!userSnap) return;
    const userSnapData = userSnap.data() as IUser;
    if (!userSnapData?.belongRooms) return;
    else if (!!userSnapData?.belongRooms) {
      const belongRoomDatas: IChatRoom[] = [];
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
          // if (!!tempBelongRoomData.tags) {
          Object.values(tempBelongRoomData.tags).map(
            async (tag: DocumentReference, j: number) => {
              const tagDoc = await getDoc(tag);
              const tagData = await tagDoc.data();
              belongRoomData.tags.push({
                id: tag.id,
                value: tagData?.value,
              });
            }
          );
          // }

          const ownerRef = tempBelongRoomData.owner;
          const ownerDoc = await getDoc(ownerRef);
          const ownerData = ownerDoc.data();
          belongRoomData.owner = ownerData as IUser;

          await belongRoomDatas.push(belongRoomData);
          setBelongRooms([...belongRoomDatas]);
        }
      );
    }
  }, [userSnap]);

  return [belongRooms, setUserSnap];
};
