import { IUser } from "@types";
export interface Props {
  user: IUser;
  onClick: (uid: string) => void;
}
