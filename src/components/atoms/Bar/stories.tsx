import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Bar } from ".";

export default {
  title: "@components/atoms/Bar",
  component: Bar,
  argTypes: {
    textColor: {
      control: { type: "color" },
    },
    color: {
      control: { type: "color" },
    },
  },
} as ComponentMeta<typeof Bar>;

const Template: ComponentStory<typeof Bar> = (args) => <Bar {...args} />;

const setArgs = (textColor: string, color: string, value: string) => (
  tail: "top" | "right" | "bottom" | "left"
) => {
  return { textColor, color, value, tail };
};
const args = setArgs("#0d0015", "pink", "hello! this is storybook!");

export const top = Template.bind({});
top.args = args("top");
