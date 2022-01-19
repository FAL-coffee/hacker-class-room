import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { Toppage } from ".";

describe("<Toppage />", () => {
  const toppage = shallow(<Toppage />);

  it("render", () => {
    expect(toppage.exists());
  });
});
