import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { Profile } from ".";
import { TABS } from "./fixture";

describe("<Profile />", () => {
  const profile = shallow(<Profile tabs={TABS} />);

  it("render", () => {
    expect(profile.exists());
  });
});
