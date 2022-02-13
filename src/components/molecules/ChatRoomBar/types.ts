import { IChatRoom } from "@types";
export interface Props {
  chatRoom: IChatRoom;
  onClick: (id: string) => void;
  onUserClick:(uid:string)=>void;
  onTagClick: (genreId:string,id: string) => void;
}
