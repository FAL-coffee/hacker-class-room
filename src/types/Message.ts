import { Timestamp } from "firebase/firestore";

export interface IMessage {
  value: string;
  postedAt: Timestamp;
  postedUid: string;
}
