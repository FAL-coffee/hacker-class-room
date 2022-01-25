import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { UserBar } from ".";
import { USER } from "./fixture";

export default {
  title: "@components/molecules/UserBar",
  component: UserBar,
} as ComponentMeta<typeof UserBar>;

const Template: ComponentStory<typeof UserBar> = (args) => (
  <UserBar {...args} />
);

export const userBar = Template.bind({});
userBar.args = {
  user: USER,
};
