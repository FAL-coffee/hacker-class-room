import { Stack } from "@mui/material";

import { ChatRoomBar } from "@/components/molecules";
import { IChatRoom } from "@types";
import { Props } from "./types";

export const ChatRoomBarList = ({ ...props }: Props) => {
  return (
    <Stack direction="column" spacing={2}>
      {props.chatRooms.map((chatRoom: IChatRoom, i: number) => (
        <ChatRoomBar
          key={i}
          chatRoom={chatRoom}
          onClick={props.onOpenClick}
          onTagClick={props.onTagClick}
        />
      ))}
    </Stack>
  );
};
