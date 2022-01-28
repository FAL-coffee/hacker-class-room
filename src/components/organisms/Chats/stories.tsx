import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { Chats } from ".";
import { USER, MESSAGE } from "@fixtures";

export default {
  title: "@components/organisms/Chats",
  component: Chats,
} as ComponentMeta<typeof Chats>;

const Template: ComponentStory<typeof Chats> = (args) => <Chats {...args} />;

export const login = Template.bind({});
login.args = {
  user: USER,
  messages: [MESSAGE, MESSAGE],
};
