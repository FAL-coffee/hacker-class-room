import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { ChatRoomCard } from ".";
import { IMessage } from "@types";
import { Props } from "./types";
import { USER } from "./fixture";

describe("<ChatRoomCard />", () => {
  const props: Props = {
    onOpenClick: jest.fn(),
    chatRoom: {
      owner: USER,
      name: "storybook",
      description: "hello! this is chatroom card testing for storybook.",
      createdAt: { seconds: 0, nanoseconds: 0 } as IMessage["postedAt"],
    },
  };
  const chatRoomCard = shallow(<ChatRoomCard {...props} />);

  it("render", () => {
    expect(chatRoomCard.exists());
  });
});
