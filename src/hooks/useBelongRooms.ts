import { useEffect, useState } from "react";
import {
  getDoc,
  DocumentReference,
  Timestamp,
  DocumentSnapshot,
} from "@/plugin/firebase";
import { IChatRoom, IUser, ITag } from "@types";

// interface ITagRef {
//   genreRef: DocumentReference;
//   tagRef: DocumentReference;
// }
interface DocumentSnapshotType {
  [key: string]: any | Timestamp;
}

interface ITempChatRoom extends DocumentSnapshotType {
  id: string;
  owner: DocumentReference<IUser>;
  iconURL?: string;
  name: string;
  tags: DocumentReference<ITag>[];
  description: string;
  createdAt: Timestamp;
}
interface ITempUser {
  displayName: string;
  email: string;
  uid: string;
  message?: string;
  photoURL?: string;
  lastLoginAt: Date;
  belongRooms?: DocumentReference<ITempChatRoom>[];
}

export const useBelongRooms = (): //   initialState?: DocumentSnapshot
[IChatRoom[], Boolean, (userSnap?: DocumentSnapshot) => void] => {
  // const [tempBelongRooms, setTempBelongRooms] = useState<IChatRoom[]>([]);
  const [userSnap, setUserSnap] = useState<DocumentSnapshot>();
  const [belongRooms, setBelongRooms] = useState<IChatRoom[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  useEffect(() => {
    (async () => {
      await setLoading(true);
      if (!userSnap) return;
      const userSnapData = userSnap.data() as ITempUser;
      if (!userSnapData?.belongRooms) return;
      else if (!!userSnapData?.belongRooms) {
        const belongRoomDatas: IChatRoom[] = [];
        await Promise.all(
          userSnapData.belongRooms.map(
            async (
              belongRoomRef: DocumentReference<ITempChatRoom>,
              i: number
            ) => {
              const belongRoomDoc = await getDoc(belongRoomRef);
              if (!belongRoomDoc.exists()) return;
              const tempBelongRoomData = belongRoomDoc.data();
              Object.keys(tempBelongRoomData).forEach((key) => {
                if (
                  typeof tempBelongRoomData[key].toString == "function" &&
                  tempBelongRoomData[key].toString().startsWith("Timestamp")
                ) {
                  (tempBelongRoomData as DocumentSnapshotType)[
                    key
                  ] = Timestamp.fromDate(tempBelongRoomData[key]);
                }
              });

              const ownerRef = tempBelongRoomData.owner;
              const ownerDoc = await getDoc(ownerRef);
              const ownerData = ownerDoc.data();
              const owner = !!ownerData
                ? ownerData
                : {
                    displayName: "user is not found",
                    email: "user is not found",
                    lastLoginAt: new Date("1900-01-01T00:00:00"),
                    uid: "404",
                  };

              const belongRoomData: IChatRoom = {
                ...tempBelongRoomData,
                id: belongRoomRef.id,
                createdAt: new Date("1900-01-01T00:00:00"),
                tags: [],
                owner: owner,
              };
              // tagsの取得・格納
              // if (!!tempBelongRoomData.tags) {
              await Promise.all(
                await Object.values(tempBelongRoomData.tags).map(
                  async (tag: DocumentReference<ITag>, j: number) => {
                    const tagDoc = await getDoc(tag);
                    const tagData = await tagDoc.data();
                    await belongRoomData.tags.push({
                      id: tag.id,
                      value: tagData && tagData.value ? tagData.value : "",
                    });
                  }
                )
              );

              await belongRoomDatas.push(belongRoomData);
              await setBelongRooms([...belongRoomDatas]);
            }
          )
        );
      }
      await setLoading(false);
    })();
  }, [userSnap]);

  return [belongRooms, loading, setUserSnap];
};
