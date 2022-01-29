import { IUser, IMessage } from "@types";

export interface Props {
  user: IUser;
  messages: Array<IMessage>;
  onUserClick?: (uid: string) => void;
}
