import { DocumentReference } from "firebase/firestore";
// import { IChatRoom } from "..";
export interface F_IBelongRoom {
  room: DocumentReference;
  joinAt: Date;
}
