import { Stack } from "@mui/material";

import { ChatRoomCard } from "@/components/molecules";
import { IChatRoom } from "@types";
import { Props } from "./types";

export const ChatRoomCardList = ({ ...props }: Props) => {
  return (
    <Stack direction="column" spacing={3}>
      {props.chatRooms.map((chatRoom: IChatRoom, i: number) => (
        <ChatRoomCard
          key={i}
          chatRoom={chatRoom}
          onOpenClick={props.onOpenClick}
        />
      ))}
    </Stack>
  );
};
