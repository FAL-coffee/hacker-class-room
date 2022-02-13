import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import { GoogleSigninButton } from ".";

storiesOf("@components/atoms/GoogleSigninButton", module)
  .addParameters({ component: GoogleSigninButton })
  .add("default", () => <GoogleSigninButton onClick={action("onClick")} />);
