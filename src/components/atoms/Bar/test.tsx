import React from "react";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { Bar } from ".";

describe("<Bar />", () => {
  const bar = shallow(<Bar value="" tail="top" color="" textColor="" />);

  it("render", () => {
    expect(bar.exists());
  });
});
