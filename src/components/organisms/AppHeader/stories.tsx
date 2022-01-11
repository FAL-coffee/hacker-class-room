import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { AppHeader } from ".";
import { USER } from "./fixture";

export default {
  title: "@components/organisms/AppHeader",
  component: AppHeader,
} as ComponentMeta<typeof AppHeader>;

const Template: ComponentStory<typeof AppHeader> = (args) => (
  <div style={{ height: "500px" }}>
    <AppHeader {...args} />
  </div>
);

export const login = Template.bind({});
login.args = {
  user: USER,
};
