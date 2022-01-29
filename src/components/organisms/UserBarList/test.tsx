import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { UserBarList } from ".";
import { Props } from "./types";
import { USER } from "@fixtures";

describe("<UserBarList />", () => {
  const props: Props = {
    onUserClick: jest.fn(),
    users: [USER, USER],
  };
  const userBarList = shallow(<UserBarList {...props} />);

  it("render", () => {
    expect(userBarList.exists());
  });
});
