import { DocumentReference } from "firebase/firestore";
import { IChatRoom } from ".";
export interface IUser {
  displayName: string;
  email: string;
  uid: string;
  message?: string;
  photoURL?: string;
  lastLoginAt?: Date;
  belongRooms?: DocumentReference<IChatRoom>[];
}
