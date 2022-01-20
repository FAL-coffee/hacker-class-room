import React from "react";
import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
import { Toppage } from ".";

storiesOf("@components/template/Toppage", module)
  .addParameters({ component: Toppage })
  .add("default", () => <Toppage />);
