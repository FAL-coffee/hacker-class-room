import { DocumentReference } from "firebase/firestore";
export interface IUser {
  displayName: string;
  email: string;
  uid: string;
  message?: string;
  photoURL?: string;
  belongRooms?: DocumentReference[];
  follows?: DocumentReference[];
  followers?: DocumentReference[];
}
