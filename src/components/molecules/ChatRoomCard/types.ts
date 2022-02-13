import { IChatRoom } from "@types";
export interface Props {
  chatRoom: IChatRoom;
  onOpenClick: (id: string) => void;
  onTagClick:(genreId:string,id:string)=>void;
  onUserClick:(uid:string)=>void;
}
