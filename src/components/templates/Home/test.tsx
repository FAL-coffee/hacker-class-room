import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { Home } from ".";

describe("<Home />", () => {
  const home = shallow(<Home />);

  it("render", () => {
    expect(home.exists());
  });
});
