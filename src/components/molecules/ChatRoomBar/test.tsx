import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { ChatRoomBar } from ".";
import { Props } from "./types";
import { CHATROOM } from "@fixtures";

describe("<ChatRoomBar />", () => {
  const props: Props = {
    onClick: jest.fn(),
    onTagClick: jest.fn(),
    chatRoom: CHATROOM,
  };
  const chatRoomBar = shallow(<ChatRoomBar {...props} />);

  it("render", () => {
    expect(chatRoomBar.exists());
  });
});
