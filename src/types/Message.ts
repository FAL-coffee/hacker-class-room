import { Timestamp } from "firebase/firestore";

export interface Message {
  value: string;
  postedAt: Timestamp;
  postedUid: string;
}
