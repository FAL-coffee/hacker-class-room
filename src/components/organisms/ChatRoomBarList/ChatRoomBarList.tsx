import { Stack } from "@mui/material";

import { ChatRoomBar } from "@/components/molecules";
import { IChatRoom } from "@types";
import { Props } from "./types";

export const ChatRoomBarList = ({ ...props }: Props) => {
  return (
    <Stack direction="column" spacing={2}>
      {props.chatRooms.map((chatRoom: IChatRoom, i: number) => (
        <span key={i} id={`chat_room_bar_list-chat_room_bar_${chatRoom.id}`}>
          <ChatRoomBar
            chatRoom={chatRoom}
            onClick={props.onOpenClick}
            onUserClick={props.onUserClick}
            onTagClick={props.onTagClick}
          />
        </span>
      ))}
    </Stack>
  );
};
