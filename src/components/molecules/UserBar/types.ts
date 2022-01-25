import { IChatRoom } from "@types";
export interface Props {
  chatRoom: IChatRoom;
  onOpenClick: (id: string) => void;
}
