import { storiesOf } from "@storybook/react";
import React from "react";
import { LoadingAnimation } from ".";
// import { Props } from "./types";

storiesOf("@components/atoms/LoadingAnimation", module)
  .addParameters({ component: LoadingAnimation })
  .add("default", () => <LoadingAnimation />);
