import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { SpeechBallon } from ".";

export default {
  title: "@components/atoms/SpeechBallon",
  component: SpeechBallon,
  argTypes: {
    textColor: {
      control: { type: "color" },
    },
    color: {
      control: { type: "color" },
    },
  },
} as ComponentMeta<typeof SpeechBallon>;

const Template: ComponentStory<typeof SpeechBallon> = (args) => (
  <SpeechBallon {...args} />
);

const setArgs = (textColor: string, color: string, value: string) => (
  tail: "top" | "right" | "bottom" | "left"
) => {
  return { textColor, color, value, tail };
};
const args = setArgs("#0d0015", "pink", "hello! this is storybook!");

export const top = Template.bind({});
top.args = args("top");

export const right = Template.bind({});
right.args = args("right");

export const bottom = Template.bind({});
bottom.args = args("bottom");

export const left = Template.bind({});
left.args = args("left");

export const preLine = Template.bind({});
preLine.args = {
  tail: "right",
  textColor: "#0d0015",
  color: "pink",
  value: `hello! this is storybook!\nIt is possible to include a line feed code in the text!
  It also handles just line breaks and spaces.`,
};
