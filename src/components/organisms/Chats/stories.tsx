import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { Chats } from ".";
import { USER } from "./fixture";
import { IMessage } from "@/types";
import { Timestamp } from "@/plugin/firebase";

export default {
  title: "@components/organisms/Chats",
  component: Chats,
} as ComponentMeta<typeof Chats>;

const Template: ComponentStory<typeof Chats> = (args) => <Chats {...args} />;

const MESSAGE: IMessage = {
  value: `test message`,
  postedAt: Timestamp.fromDate(new Date()),
  postedUid: `mockUsersUID`,
};

export const login = Template.bind({});
login.args = {
  user: USER,
  userMessageList: [
    { user: { ...USER, uid: USER.uid + "00" }, message: MESSAGE },
    { user: USER, message: MESSAGE },
  ],
};
