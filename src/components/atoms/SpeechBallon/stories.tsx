import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { SpeechBallon } from ".";

export default {
  title: "@components/atoms/SpeechBallon",
  component: SpeechBallon,
  argTypes: {
    color: {
      control: { type: "color" },
    },
  },
} as ComponentMeta<typeof SpeechBallon>;

const Template: ComponentStory<typeof SpeechBallon> = (args) => (
  <SpeechBallon {...args} />
);

const setArgs = (color: string, value: string) => (
  tail: "top" | "right" | "bottom" | "left"
) => {
  return { color, value, tail };
};
const args = setArgs("pink", "hello! this is storybook!");

export const top = Template.bind({});
top.args = args("top");

export const right = Template.bind({});
right.args = args("right");

export const bottom = Template.bind({});
bottom.args = args("bottom");

export const left = Template.bind({});
left.args = args("left");
