import { IUser, IMessage } from "@types";
export interface Props {
  user?: IUser;
  message: IMessage;
  isMine: boolean;
  onUserClick?: (uid: string) => void;
}
