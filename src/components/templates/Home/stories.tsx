import React from "react";
import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
import { Home } from ".";

storiesOf("@components/template/Home", module)
  .addParameters({ component: Home })
  .add("default", () => <Home />);
