import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ChatRoomCard } from ".";
import { IChatRoom } from "@types";
import { USER } from "./fixture";
import { Timestamp } from "@/plugin/firebase";

export default {
  title: "@components/molecules/ChatRoomCard",
  component: ChatRoomCard,
} as ComponentMeta<typeof ChatRoomCard>;

const CHATROOM: IChatRoom = {
  id: "this is storybook",
  owner: USER,
  name: "storybook",
  description: "hello! this is chatroom card testing for storybook.",
  createdAt: Timestamp.fromDate(new Date()),
};

const Template: ComponentStory<typeof ChatRoomCard> = (args) => (
  <ChatRoomCard {...args} />
);

export const chatroom = Template.bind({});
chatroom.args = {
  chatRoom: CHATROOM,
};
