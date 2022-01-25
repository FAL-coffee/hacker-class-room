import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { UserBar } from ".";
import { IMessage } from "@types";
import { Props } from "./types";
import { USER } from "./fixture";

describe("<UserBar />", () => {
  const props: Props = {
    onOpenClick: jest.fn(),
    chatRoom: {
      id: "test",
      owner: USER,
      name: "storybook",
      description: "hello! this is chatroom card testing for storybook.",
      createdAt: { seconds: 0, nanoseconds: 0 } as IMessage["postedAt"],
    },
  };
  const userBar = shallow(<UserBar {...props} />);

  it("render", () => {
    expect(userBar.exists());
  });
});
