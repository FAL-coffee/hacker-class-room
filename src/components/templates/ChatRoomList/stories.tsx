import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { ChatRoomCardList } from "@components/organisms";
import { CHATROOM } from "@fixtures";
import { ChatRoomList } from ".";
const SChatRoomListDisplayArea = () => {
  const props = {
    chatRooms: [CHATROOM, CHATROOM],
    onOpenClick: action("onOpenClick"),
  };
  return <ChatRoomCardList {...props} />;
};

storiesOf("@components/template/ChatRoomList", module)
  .addParameters({ component: ChatRoomList })
  .add("default", () => (
    <ChatRoomList ChatRoomListDisplayArea={<SChatRoomListDisplayArea />} />
  ));
