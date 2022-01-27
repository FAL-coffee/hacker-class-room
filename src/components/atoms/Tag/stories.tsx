import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Tag } from ".";

export default {
  title: "@components/atoms/Tag",
  component: Tag,
  argTypes: {
    size: {
      options: ["small", "medium"],
      control: { type: "select" },
    },
    color: {
      options: [
        "default",
        "primary",
        "secondary",
        "error",
        "info",
        "success",
        "warning",
      ],
      control: { type: "select" },
    },
  },
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;
export const small = Template.bind({});
small.args = {
  id: "storybook-tag-id",
  name: "tag",
  size: "small",
  color: "default",
};

export const medium = Template.bind({});
medium.args = {
  id: "storybook-tag-id",
  name: "tag",
  size: "medium",
  color: "default",
};

export const primary = Template.bind({});
primary.args = {
  id: "storybook-tag-id",
  name: "tag",
  size: "medium",
  color: "primary",
};

export const secondary = Template.bind({});
secondary.args = {
  id: "storybook-tag-id",
  name: "tag",
  size: "medium",
  color: "secondary",
};

export const error = Template.bind({});
error.args = {
  id: "storybook-tag-id",
  name: "tag",
  size: "medium",
  color: "error",
};

export const info = Template.bind({});
info.args = {
  id: "storybook-tag-id",
  name: "tag",
  size: "medium",
  color: "info",
};

export const success = Template.bind({});
success.args = {
  id: "storybook-tag-id",
  name: "tag",
  size: "medium",
  color: "success",
};

export const warning = Template.bind({});
warning.args = {
  id: "storybook-tag-id",
  name: "tag",
  size: "medium",
  color: "warning",
};
