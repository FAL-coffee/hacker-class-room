import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { ListTab } from ".";
import { TABS } from "./fixture";

describe("<ListTab />", () => {
  const listTab = shallow(<ListTab tabs={TABS} />);

  it("render", () => {
    expect(listTab.exists());
  });
});
