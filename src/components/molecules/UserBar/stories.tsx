import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { UserBar } from ".";
import { IChatRoom } from "@types";
import { USER } from "./fixture";
import { Timestamp } from "@/plugin/firebase";

export default {
  title: "@components/molecules/UserBar",
  component: UserBar,
} as ComponentMeta<typeof UserBar>;

const CHATROOM: IChatRoom = {
  id: "this is storybook",
  owner: USER,
  name: "storybook",
  description: "hello! this is chatroom card testing for storybook.",
  createdAt: Timestamp.fromDate(new Date()),
};

const Template: ComponentStory<typeof UserBar> = (args) => (
  <UserBar {...args} />
);

export const userBar = Template.bind({});
userBar.args = {
  chatRoom: CHATROOM,
};
