import { IChatRoom } from "@types";
export interface Props {
  chatRooms: IChatRoom[];
  onOpenClick: (id: string) => void;
  onUserClick:(uid:string)=>void;
  onTagClick:(genreId:string,id: string) => void;
}
