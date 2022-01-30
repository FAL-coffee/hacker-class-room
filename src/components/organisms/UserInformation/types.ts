import { IUser } from "@types";
export interface Props {
  user: IUser;
  isMe: boolean;
  following?: boolean;
  onFollowClick?: (uid: string) => void;
  onUnFollowClick?: (uid: string) => void;
  onSendMessageClick?: (uid: string) => void;
}
