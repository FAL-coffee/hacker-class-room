import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ChatRoomBar } from ".";
import { CHATROOM } from "@fixtures";

export default {
  title: "@components/molecules/ChatRoomBar",
  component: ChatRoomBar,
} as ComponentMeta<typeof ChatRoomBar>;

const Template: ComponentStory<typeof ChatRoomBar> = (args) => (
  <ChatRoomBar {...args} />
);

export const chatRoomBar = Template.bind({});
chatRoomBar.args = {
  chatRoom: CHATROOM,
};
