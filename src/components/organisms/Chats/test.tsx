import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { Chats } from ".";
import { USER, MESSAGE } from "@fixtures";
import { Props } from "./types";

describe("<Chats />", () => {
  const props: Props = {
    user: USER,
    messages: [MESSAGE],
  };
  const chats = shallow(<Chats {...props} />);

  it("render", () => {
    expect(chats.exists());
  });
});
