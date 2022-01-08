import { User, Message } from "@types";
export interface Props {
  user: User;
  message: Message;
  isMine: boolean;
  onIconClick: (uid: string) => void;
}
