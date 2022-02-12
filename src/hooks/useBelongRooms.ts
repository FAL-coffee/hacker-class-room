import { useCallback, useState } from "react";
import {
  getDoc,
  DocumentReference,
  Timestamp,
  DocumentSnapshot,
} from "@/plugin/firebase";
import { IChatRoom, ITag, IUser } from "@types";

interface ITagRef {
  genreRef: DocumentReference;
  tagRef: DocumentReference;
}
interface ITempChatRoom {
  id: string;
  owner: DocumentReference;
  iconURL?: string;
  name: string;
  tags: ITagRef[];
  description: string;
  createdAt: Timestamp;
  messages?: DocumentReference;
}

export const useBelongRooms = (): //   initialState?: DocumentSnapshot
[IChatRoom[], (userSnap?: DocumentSnapshot) => void] => {
  const [tempBelongRooms, setTempBelongRooms] = useState<IChatRoom[]>([]);
  const setBelongRooms = useCallback((userSnap?: DocumentSnapshot) => {
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
          if (!!tempBelongRoomData.tags) {
            await tempBelongRoomData.tags.map(
              async (tag: ITagRef, j: number) => {
                const tagDoc = await getDoc(tag.tagRef);
                const tagData = await tagDoc.data();
                await belongRoomData.tags.push({
                  id: tag.tagRef.id,
                  value: tagData?.value,
                  genreId: tag.genreRef.id,
                } as ITag);
              }
            );
          }

          const ownerRef = tempBelongRoomData.owner;
          const ownerDoc = await getDoc(ownerRef);
          const ownerData = ownerDoc.data();
          belongRoomData.owner = ownerData as IUser;

          belongRoomDatas.push(belongRoomData);
          setTempBelongRooms([...belongRoomDatas]);
        }
      );
    }
  }, []);

  return [tempBelongRooms, setBelongRooms];
};
