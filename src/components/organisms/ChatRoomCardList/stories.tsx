import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ChatRoomCardList } from ".";
import { IChatRoom } from "@types";
import { USER } from "./fixture";
import { Timestamp } from "@/plugin/firebase";

export default {
  title: "@components/organisms/ChatRoomCardList",
  component: ChatRoomCardList,
} as ComponentMeta<typeof ChatRoomCardList>;

const CHATROOM: IChatRoom = {
  id: "this is storybook",
  owner: USER,
  name: "storybook",
  description: "hello! this is chatroom card testing for storybook.",
  createdAt: Timestamp.fromDate(new Date()),
};

const Template: ComponentStory<typeof ChatRoomCardList> = (args) => (
  <ChatRoomCardList {...args} />
);

export const chatroomlist = Template.bind({});
chatroomlist.args = {
  chatRooms: [CHATROOM, CHATROOM, CHATROOM],
};
