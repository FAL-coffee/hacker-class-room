import { IUser } from "@types";
export interface Props {
  user: IUser;
  isMe: boolean;
  following?: boolean;
  freezeDirectMessage?: boolean;
  onFollowClick?: (uid: string) => void;
  onUnFollowClick?: (uid: string) => void;
  onSendMessageClick?: (uid: string) => void;
}

export interface FollowButtonProps {
  following: boolean;
  onClick: () => void;
}

export interface DirectMessageIconButtonProps {
  disabled: boolean;
  onClick: () => void;
}
