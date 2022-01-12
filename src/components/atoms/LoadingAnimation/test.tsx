import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { LoadingAnimation } from ".";

describe("<LoadingAnimation />", () => {
  const loadingAnimation = shallow(<LoadingAnimation />);

  it("render", () => {
    expect(loadingAnimation.exists());
  });
});
