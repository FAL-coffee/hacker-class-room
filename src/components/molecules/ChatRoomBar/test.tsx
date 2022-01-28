import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { ChatRoomBar } from ".";
import { IMessage } from "@types";
import { Props } from "./types";
import { USER } from "./fixture";

describe("<ChatRoomBar />", () => {
  const props: Props = {
    onClick: jest.fn(),
    onTagClick: jest.fn(),
    chatRoom: {
      id: "test",
      owner: USER,
      name: "storybook",
      iconURL: "/favicon.ico",
      tags: [
        { id: "test-tag1-id", value: "test-tag1-value" },
        { id: "test-tag2-id", value: "test-tag2-value" },
      ],
      description: "hello! this is chatroom card testing for storybook.",
      createdAt: { seconds: 0, nanoseconds: 0 } as IMessage["postedAt"],
    },
  };
  const chatRoomBar = shallow(<ChatRoomBar {...props} />);

  it("render", () => {
    expect(chatRoomBar.exists());
  });
});
