import React from "react";
import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
import { Profile } from ".";
import * as fixtures from "./fixture";

storiesOf("@components/template/Profile", module)
  .addParameters({ component: Profile })
  .add("default", () => (
    <Profile
      userInformationArea={<fixtures.FUserInformation />}
      listTabArea={<fixtures.FListTab />}
    />
  ));
