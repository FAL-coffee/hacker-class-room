import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { Profile } from ".";

describe("<Profile />", () => {
  const profile = shallow(<Profile />);

  it("render", () => {
    expect(profile.exists());
  });
});
