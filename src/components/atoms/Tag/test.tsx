import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { Tag } from ".";
import { Props } from "./types";

describe("<Tag />", () => {
  const props: Props = {
    id: "test-tag-id",
    value: "test-tag-value",
    size: "small",
    color: "default",
    onClick: jest.fn(),
  };
  const tag = shallow(<Tag {...props} />);

  it("render", () => {
    expect(tag.exists());
  });

  it("props value, what appears in labels text", () => {
    tag.setProps({ value: "renders text test" });
    expect(tag.props().label).toEqual("renders text test");
  });

  it("color when changing the color of props.", () => {
    tag.setProps({ color: "colors test" });
    expect(tag.props().color).toEqual("colors test");
  });

  it("size when changing the color of props.", () => {
    tag.setProps({ size: "large" });
    expect(tag.props().size).toEqual("large");
  });

  // it("When clicked, the event will fire", () => {
  //   tag.setProps({ id: "click-simulation-test" });
  //   tag.simulate("click", () => {
  //     expect(props.onClick("click-simulation-test")).toHaveBeenCalled();
  //   });
  // });
});
