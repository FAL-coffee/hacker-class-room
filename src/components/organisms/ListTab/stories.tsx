import React from "react";
import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
import { ListTab } from ".";
import { TABS } from "./fixture";

storiesOf("@components/organisms/ListTab", module)
  .addParameters({ component: ListTab })
  .add("default", () => <ListTab tabs={TABS} />);
