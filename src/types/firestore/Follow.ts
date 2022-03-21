import { DocumentReference } from "firebase/firestore";
import { IUser } from "..";
export interface IFollow {
  user: DocumentReference<IUser>;
  followAt: Date;
}
