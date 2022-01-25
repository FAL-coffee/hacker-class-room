import React from "react";
import { shallow } from "enzyme";
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

  it("props arrowColor, the color of the arrow changes", () => {
    bar.setProps({ arrowColor: "red" });
    expect(bar.find("#bar_arrow")).toHaveStyleRule(
      "border-top",
      "solid 4px red"
    );
    expect(bar.find("#bar_arrow")).toHaveStyleRule(
      "border-right",
      "solid 4px red"
    );
  });

  it("When clicked, the event will fire", () => {
    bar.simulate("click", () => {
      expect(props.onClick()).toHaveBeenCalled();
    });
  });
});
