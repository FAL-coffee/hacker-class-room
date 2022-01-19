import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { ChatRoomCardList } from ".";
import { IMessage } from "@types";
import { Props } from "./types";
import { USER } from "./fixture";

describe("<ChatRoomCardList />", () => {
  const props: Props = {
    onOpenClick: jest.fn(),
    chatRooms: [
      {
        id: "test",
        owner: USER,
        name: "storybook",
        description: "hello! this is chatroom card testing for storybook.",
        createdAt: { seconds: 0, nanoseconds: 0 } as IMessage["postedAt"],
      },
    ],
  };
  const chatRoomCardList = shallow(<ChatRoomCardList {...props} />);

  it("render", () => {
    expect(chatRoomCardList.exists());
  });
});
