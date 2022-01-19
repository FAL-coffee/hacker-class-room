import { DocumentReference, Timestamp } from "@/plugin/firebase";
import { IUser } from ".";

export interface IChatRoom {
  id: string;
  owner: IUser;
  name: string;
  description: string;
  createdAt: Timestamp;
  messages?: DocumentReference;
}
