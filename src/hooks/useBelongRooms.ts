import { useEffect, useState } from "react";
import {
  getDocs,
  DocumentReference,
  getDoc,
  DocumentSnapshot,
  query,
  collection,
  orderBy,
  // limit,
  db,
} from "@/plugin/firebase";
import { converter } from "@/utils/firebase";
import { IChatRoom, IUser, ITag, F_IChatRoom, F_ITag } from "@types";

interface IRoomRef {
  joinAt: Date;
  room: DocumentReference<F_IChatRoom>;
}
// interface DocumentSnapshotType {
//   [key: string]: any | Timestamp;
// }

export const useBelongRooms = (): //   initialState?: DocumentSnapshot
// [IChatRoom[], Boolean, (userSnap?: DocumentSnapshot<ITempUser>) => void] => {
[IChatRoom[], Boolean, (userSnap?: DocumentSnapshot<IUser>) => void] => {
  // const [tempBelongRooms, setTempBelongRooms] = useState<IChatRoom[]>([]);
  // const [userSnap, setUserSnap] = useState<DocumentSnapshot<ITempUser>>();
  const [userSnap, setUserSnap] = useState<DocumentSnapshot<IUser>>();
  const [belongRooms, setBelongRooms] = useState<IChatRoom[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  useEffect(() => {
    (async () => {
      await setLoading(true);
      if (!userSnap) return;
      // owner:DocumentSnapshot<IUser>, tags:DocumentSnapshot
      const tempBelongRooms: F_IChatRoom[] = [];
      const rooms: IChatRoom[] = [];

      const q = query(
        collection(db, "users", userSnap.id, "belongRooms").withConverter(
          converter<IRoomRef>()
        ),
        orderBy("joinAt", "asc")
        // limit(30)
      );
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot);
      await Promise.all(
        await querySnapshot.docs.map(async (doc) => {
          const roomDoc = await getDoc(
            doc.data().room.withConverter(converter<F_IChatRoom>())
          );
          await tempBelongRooms.push({
            ...roomDoc.data(),
            id: roomDoc.id,
          } as F_IChatRoom);
        })
      );

      // await tempBelongRooms.forEach(async (a) => {
      //   await console.log(a.id);
      // });

      await Promise.all(
        await tempBelongRooms.map(async (room) => {
          const ownerDoc = await getDoc(
            room.owner.withConverter(converter<IUser>())
          );

          const tags: ITag[] = [];
          await Promise.all(
            await Object.values(room.tags).map(async (tag) => {
              const tagDoc = await getDoc(
                tag.withConverter(converter<F_ITag>())
              );
              await tags.push({
                value: tagDoc.data()?.value as string,
                id: tagDoc.id,
              });
            })
          );

          await rooms.push({
            ...room,
            owner: ownerDoc.data() as IUser,
            tags: tags,
          });
        })
      );
      await setBelongRooms([...rooms]);
      await setLoading(false);
    })();
  }, [userSnap]);

  return [belongRooms, loading, setUserSnap];
};
