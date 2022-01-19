import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { Chats } from ".";
import { USER } from "./fixture";
import { Props } from "./types";
import { IMessage } from "@types";
const MESSAGE: IMessage = {
  value: `test message`,
  postedAt: { seconds: 0, nanoseconds: 0 } as IMessage["postedAt"],
  user: USER,
};
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
