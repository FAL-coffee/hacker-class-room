import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { ChatRoomBarList } from ".";
import { Props } from "./types";
import { CHATROOM } from "@fixtures";

describe("<ChatRoomBarList />", () => {
  const props: Props = {
    onOpenClick: jest.fn(),
    onTagClick: jest.fn(),
    chatRooms: [CHATROOM, CHATROOM],
  };
  const chatRoomBarList = shallow(<ChatRoomBarList {...props} />);

  it("render", () => {
    expect(chatRoomBarList.exists());
  });
});
