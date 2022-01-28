import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ChatRoomBar } from ".";
import { IChatRoom } from "@types";
import { USER } from "./fixture";
import { Timestamp } from "@/plugin/firebase";

export default {
  title: "@components/molecules/ChatRoomBar",
  component: ChatRoomBar,
} as ComponentMeta<typeof ChatRoomBar>;

const CHATROOM: IChatRoom = {
  id: "this is storybook",
  owner: USER,
  name: "storybook",
  iconURL: "/logo.png",
  tags: [
    { id: "test-tag1-id", value: "test-tag1-value" },
    { id: "test-tag2-id", value: "test-tag2-value" },
  ],
  description: "hello! this is chatroom card testing for storybook.",
  createdAt: Timestamp.fromDate(new Date()),
};

const Template: ComponentStory<typeof ChatRoomBar> = (args) => (
  <ChatRoomBar {...args} />
);

export const chatRoomBar = Template.bind({});
chatRoomBar.args = {
  chatRoom: CHATROOM,
  // user: USER,
};
