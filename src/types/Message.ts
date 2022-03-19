// import { Timestamp } from "firebase/firestore";
import { IUser } from ".";

export interface IMessage {
  value: string;
  postedAt: Date;
  user?: IUser;
}
