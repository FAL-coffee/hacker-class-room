import { Stack } from "@mui/material";

import { ChatRoomCard } from "@/components/molecules";
import { IChatRoom } from "@types";
import { Props } from "./types";

export const ChatRoomCardList = ({ ...props }: Props) => {
  return (
    <Stack direction="column" spacing={3}>
      {props.chatRooms.map((chatRoom: IChatRoom, i: number) => (
        <span key={i} id={`chat_room_card_list-chat_room_card_${chatRoom.id}`}>
          <ChatRoomCard
            chatRoom={chatRoom}
            onOpenClick={props.onOpenClick}
            onTagClick={props.onTagClick}
            onUserClick={props.onUserClick}
          />
        </span>
      ))}
    </Stack>
  );
};
