import { action } from "@storybook/addon-actions";

import { ChatRoomCardList } from "@components/organisms";
import { CHATROOM } from "@fixtures";

export const FChatRoomListDisplayArea = () => {
  const props = {
    chatRooms: [CHATROOM, CHATROOM],
    onOpenClick: action("onOpenClick"),
    onTagClick: action("onTagClick"),
    onUserClick: action("onUserClick"),
  };
  return <ChatRoomCardList {...props} />;
};
