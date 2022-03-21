import { DocumentReference } from "firebase/firestore";
import { IUser } from "..";
export interface IFollower {
  user: DocumentReference<IUser>;
  followedAt: Date;
}
