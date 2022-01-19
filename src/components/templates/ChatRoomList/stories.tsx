import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { ChatRoomCardList } from "@components/organisms";
import { USER } from "./fixture";
import { IChatRoom } from "@/types";
import { Timestamp } from "@/plugin/firebase";
import { ChatRoomList } from ".";
const CHATROOM: IChatRoom = {
  id: "this is storybook",
  owner: USER,
  name: "storybook",
  description: "hello! this is chatroom card testing for storybook.",
  createdAt: Timestamp.fromDate(new Date()),
};
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
