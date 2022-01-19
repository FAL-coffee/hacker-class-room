import { DocumentReference } from "firebase/firestore";
export interface IUser {
  displayName: string;
  email: string;
  uid: string;
  photoURL?: string;
  belongRooms?: DocumentReference[];
}
