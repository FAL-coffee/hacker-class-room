import React from "react";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { USER } from "./fixture";

import { Message } from ".";
import { Props } from "./types";
import { IMessage } from "@types";

describe("<Message />", () => {
  const MESSAGE: IMessage = {
    value: `test message`,
    postedAt: { seconds: 0, nanoseconds: 0 } as IMessage["postedAt"],
    postedUid: `mockUsersUID`,
  };
  const props: Props = {
    user: USER,
    message: MESSAGE,
    isMine: true,
    onIconClick: jest.fn(),
  };
  const message = shallow(<Message {...props} />);

  it("render", () => {
    expect(message.exists());
  });

  it("Ignition of the event", () => {
    message.find(Avatar).simulate("click", () => {
      expect(props.onIconClick).toHaveBeenCalled();
    });
  });
});
