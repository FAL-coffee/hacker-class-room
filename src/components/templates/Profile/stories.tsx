import React from "react";
import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
import { Profile } from ".";

storiesOf("@components/template/Profile", module)
  .addParameters({ component: Profile })
  .add("default", () => <Profile />);
