import React from "react";
// import { action } from "@storybook/addon-actions";
import { UserInformation } from ".";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { USER, MESSAGE } from "@fixtures";

export default {
  title: "@components/organisms/UserInformation",
  component: UserInformation,
} as ComponentMeta<typeof UserInformation>;

const Template: ComponentStory<typeof UserInformation> = (args) => (
  <UserInformation {...args} />
);

export const login = Template.bind({});
login.args = {
  user: USER,
};
