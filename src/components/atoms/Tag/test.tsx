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
});
