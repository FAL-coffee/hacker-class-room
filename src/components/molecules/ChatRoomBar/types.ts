import { IChatRoom, IUser } from "@types";
export interface Props {
  // user: IUser;
  chatRoom: IChatRoom;
  onClick: (uid: string) => void;
  onTagClick: (id: string) => void;
}
