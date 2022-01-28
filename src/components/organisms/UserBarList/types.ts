import { IUser } from "@types";
export interface Props {
  users: IUser[];
  onUserClick: (uid: string) => void;
}
