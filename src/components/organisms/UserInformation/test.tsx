import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { UserInformation } from ".";
import { USER } from "@fixtures";

describe("<UserInformation />", () => {
  const props = {
    user: USER,
    isMe: false,
    following: false,
    freezeDirectMessage:false,
    onFollowClick: jest.fn(),
    onUnFollowClick: jest.fn(),
    onSendMessageClick: jest.fn(),
  };
  const userInformation = shallow(<UserInformation {...props} />);

  it("render", () => {
    expect(userInformation.exists());
  });
});
