import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { ChatRoomCardList } from ".";
import { Props } from "./types";
import { CHATROOM } from "@fixtures";

describe("<ChatRoomCardList />", () => {
  const props: Props = {
    onOpenClick: jest.fn(),
    onTagClick: jest.fn(),
    onUserClick: jest.fn(),
    chatRooms: [CHATROOM, CHATROOM],
  };
  const chatRoomCardList = shallow(<ChatRoomCardList {...props} />);

  it("render", () => {
    expect(chatRoomCardList.exists());
  });
});
