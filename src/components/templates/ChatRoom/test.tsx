import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { ChatRoom } from ".";

describe("<ChatRoom />", () => {
  const chatRoom = shallow(<ChatRoom />);

  it("render", () => {
    expect(chatRoom.exists());
  });
});
