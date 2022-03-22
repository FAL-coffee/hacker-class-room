import { db, doc, DocumentReference } from "@/plugin/firebase";
import { converter } from "@/utils/firebase";
import { F_IChatRoom } from "@types";

const belongRoomIds: string = !!process.env.NEXT_PUBLIC_DEFAULT_BELONG_ROOM_IDS
  ? process.env.NEXT_PUBLIC_DEFAULT_BELONG_ROOM_IDS
  : "";
export const DEFAULT_BELONG_ROOMS: DocumentReference<
  F_IChatRoom
>[] = belongRoomIds
  .split(" ")
  .map(
    (roomId): DocumentReference<F_IChatRoom> =>
      doc(db, "chats/" + roomId).withConverter(converter<F_IChatRoom>())
  );
