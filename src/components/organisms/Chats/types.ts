import { IUser, IMessage } from "@types";

export interface UserMessage {
  user: IUser;
  message: IMessage;
}

export interface Props {
  user?: IUser | null;
  userMessageList: Array<UserMessage>;
}
