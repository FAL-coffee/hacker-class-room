import React from "react";
// import { action } from "@storybook/addon-actions";
import { UserInformation } from ".";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { USER } from "@fixtures";

export default {
  title: "@components/organisms/UserInformation",
  component: UserInformation,
} as ComponentMeta<typeof UserInformation>;

const Template: ComponentStory<typeof UserInformation> = (args) => (
  <UserInformation {...args} />
);

export const isMe = Template.bind({});
isMe.args = {
  user: USER,
  isMe: true,
};

export const isNotMe = Template.bind({});
isNotMe.args = {
  user: USER,
  isMe: false,
  following: false,
};
