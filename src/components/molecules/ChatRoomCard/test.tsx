import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { ChatRoomCard } from ".";
import { Props } from "./types";
import { CHATROOM } from "@fixtures";

describe("<ChatRoomCard />", () => {
  const props: Props = {
    onOpenClick: jest.fn(),
    chatRoom: CHATROOM,
  };
  const chatRoomCard = shallow(<ChatRoomCard {...props} />);

  it("render", () => {
    expect(chatRoomCard.exists());
  });
});
