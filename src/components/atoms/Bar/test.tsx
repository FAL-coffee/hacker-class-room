import React from "react";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";
import { Props } from "./types";

import { Bar } from ".";

describe("<Bar />", () => {
  const props: Props = {
    value: "",
    arrowColor: "",
    onClick: jest.fn(),
  };
  const bar = shallow(<Bar {...props} />);

  it("render", () => {
    expect(bar.exists());
  });

  it("props value, what appears in typography", () => {
    bar.setProps({ value: "renders text test" });
    expect(bar.find("#bar_typography").text()).toEqual("renders text test");
  });
});
