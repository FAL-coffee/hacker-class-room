import { DocumentReference } from "firebase/firestore";
import { IUser } from "..";
export interface F_IFollower {
  user: DocumentReference<IUser>;
  followedAt: Date;
}
