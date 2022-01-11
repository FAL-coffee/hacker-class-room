import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { Message } from ".";
import { USER } from "./fixture";
import { IMessage } from "@types";
import { Timestamp } from "@/plugin/firebase";

const MESSAGE: IMessage = {
  value: `test message`,
  postedAt: Timestamp.fromDate(new Date()),
  postedUid: `mockUsersUID`,
};

export default {
  title: "@components/molecules/Message",
  component: Message,
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = (args) => (
  <Message {...args} />
);

export const mime = Template.bind({});
mime.args = {
  user: USER,
  message: MESSAGE,
  isMine: true,
};

export const notMime = Template.bind({});
notMime.args = {
  user: USER,
  message: MESSAGE,
  isMine: false,
};
