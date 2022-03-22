import { DocumentReference } from "firebase/firestore";
import { IUser } from "..";
export interface F_IFollow {
  user: DocumentReference<IUser>;
  followAt: Date;
}
