import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ChatRoomBarList } from ".";
import { CHATROOM } from "@fixtures";

export default {
  title: "@components/organisms/ChatRoomBarList",
  component: ChatRoomBarList,
} as ComponentMeta<typeof ChatRoomBarList>;

const Template: ComponentStory<typeof ChatRoomBarList> = (args) => (
  <ChatRoomBarList {...args} />
);

export const chatRoomBarList = Template.bind({});
chatRoomBarList.args = {
  chatRooms: [CHATROOM, CHATROOM, CHATROOM],
};
