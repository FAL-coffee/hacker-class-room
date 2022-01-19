import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { ChatRoomList } from ".";

describe("<ChatRoomList />", () => {
  const chatRoomList = shallow(<ChatRoomList />);

  it("render", () => {
    expect(chatRoomList.exists());
  });
});
