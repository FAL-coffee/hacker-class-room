import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { UserBarList } from ".";
import { USER } from "@fixtures";

export default {
  title: "@components/organisms/UserBarList",
  component: UserBarList,
} as ComponentMeta<typeof UserBarList>;

const Template: ComponentStory<typeof UserBarList> = (args) => (
  <UserBarList {...args} />
);

export const userBarList = Template.bind({});
userBarList.args = {
  users: [USER, USER, USER],
};
