import { IUser } from "..";
import { DocumentReference } from "firebase/firestore";
export interface F_IChatRoom {
  id: string;
  owner: DocumentReference<IUser>;
  iconURL?: string;
  name: string;
  description: string;
  tags: DocumentReference[];
  createdAt: Date;
}
