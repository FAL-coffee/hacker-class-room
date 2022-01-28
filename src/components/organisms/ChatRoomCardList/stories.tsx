import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ChatRoomCardList } from ".";
import { CHATROOM } from "@fixtures";

export default {
  title: "@components/organisms/ChatRoomCardList",
  component: ChatRoomCardList,
} as ComponentMeta<typeof ChatRoomCardList>;

const Template: ComponentStory<typeof ChatRoomCardList> = (args) => (
  <ChatRoomCardList {...args} />
);

export const chatroomlist = Template.bind({});
chatroomlist.args = {
  chatRooms: [CHATROOM, CHATROOM, CHATROOM],
};
