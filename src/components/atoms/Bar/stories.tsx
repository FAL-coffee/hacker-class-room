import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Bar } from ".";

export default {
  title: "@components/atoms/Bar",
  component: Bar,
  argTypes: {
    arrowColor: {
      control: { type: "color" },
    },
  },
} as ComponentMeta<typeof Bar>;

const Template: ComponentStory<typeof Bar> = (args) => <Bar {...args} />;

export const arrowBar = Template.bind({});
arrowBar.args = {
  value: "this is storybook!",
  arrowColor: "grey",
  avatarImage: "/favicon.ico",
};
