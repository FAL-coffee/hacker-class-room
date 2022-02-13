import { action } from "@storybook/addon-actions";
import Box from "@mui/material/Box";

import { ChatRoomCardList, ChatRoomBarList } from "@components/organisms";
import { CHATROOM } from "@fixtures";

export const FChatRoomListDisplayArea = () => {
  const props = {
    chatRooms: [CHATROOM, CHATROOM],
    onOpenClick: action("onOpenClick"),
    onTagClick: action("onTagClick"),
    onUserClick: action("onUserClick"),
  };
  return (
    <Box>
      <Box sx={{ display: { xs: "none", md: "block" }, m: 1 }}>
        <ChatRoomCardList {...props} />
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" }, m: 1 }}>
        <ChatRoomBarList {...props} />
      </Box>
    </Box>
  );
};
