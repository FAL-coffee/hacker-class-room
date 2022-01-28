import { DocumentReference, Timestamp } from "@/plugin/firebase";
import { IUser, ITag } from ".";

export interface IChatRoom {
  id: string;
  owner: IUser;
  iconURL?: string;
  name: string;
  tags: ITag[];
  description: string;
  createdAt: Timestamp;
  messages?: DocumentReference;
}
