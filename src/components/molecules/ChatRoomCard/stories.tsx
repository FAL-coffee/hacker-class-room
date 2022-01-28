import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ChatRoomCard } from ".";
import { CHATROOM } from "@fixtures";

export default {
  title: "@components/molecules/ChatRoomCard",
  component: ChatRoomCard,
} as ComponentMeta<typeof ChatRoomCard>;

const Template: ComponentStory<typeof ChatRoomCard> = (args) => (
  <ChatRoomCard {...args} />
);

export const chatroom = Template.bind({});
chatroom.args = {
  chatRoom: CHATROOM,
};
