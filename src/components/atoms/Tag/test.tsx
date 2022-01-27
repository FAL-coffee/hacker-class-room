import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { Tag } from ".";

describe("<Tag />", () => {
  const tag = shallow(<Tag />);

  it("render", () => {
    expect(tag.exists());
  });
});
