import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import { MessagePostForm } from ".";
import { Props } from "./types";

const DEFAULT_PROPS: Props = {
  onSubmit: action("onSubmit"),
  loggedIn: true,
};

storiesOf("@components/molecules/MessagePostForm", module)
  .addParameters({ component: MessagePostForm })
  .add("default", () => <MessagePostForm {...DEFAULT_PROPS} />);
