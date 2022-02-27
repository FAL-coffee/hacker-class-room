import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { UserInformation, FollowButton, DirectMessageIconButton } from ".";
import { USER } from "@fixtures";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

describe("<UserInformation.FollowButton />", () => {
  const props = {
    following: false,
    onClick: jest.fn(),
  };
  const followButton = shallow(<FollowButton {...props} />);
  beforeEach(() => {
    followButton.setProps(props);
  });

  it("render", () => {
    expect(followButton.exists());
  });

  it("render text", () => {
    expect(followButton.text()).toEqual("Follow");
    followButton.setProps({ following: true });
    expect(followButton.text()).toEqual("Un Follow");
  });

  it("simulate click when not following", () => {
    followButton.find(Button).simulate("click");
    expect(props.onClick).toHaveBeenCalled();
  });

  it("simulate click when following", () => {
    followButton.setProps({ following: true });
    followButton.find(Button).simulate("click");
    expect(props.onClick).toHaveBeenCalled();
  });
});

describe("<UserInformation.DirectMessageIconButton />", () => {
  const props = {
    disabled: false,
    onClick: jest.fn(),
  };
  const directMessageIconButton = shallow(
    <DirectMessageIconButton {...props} />
  );

  beforeEach(() => {
    directMessageIconButton.setProps(props);
  });

  it("render", () => {
    expect(directMessageIconButton.exists());
  });

  it("IconButton is exists when disabled false", () => {
    directMessageIconButton.setProps({ disabled: false });
    expect(directMessageIconButton.find(IconButton).exists());
  });

  it("IconButton is not exists when disabled", () => {
    directMessageIconButton.setProps({ disabled: true });
    expect(directMessageIconButton.find(IconButton).exists()).toBeFalsy();
  });

  it("simulate click when disabled false", () => {
    directMessageIconButton.setProps({ disabled: false });
    directMessageIconButton.find(IconButton).simulate("click");
    expect(props.onClick).toHaveBeenCalled();
  });
});

describe("<UserInformation />", () => {
  const props = {
    user: USER,
    isMe: false,
    following: false,
    freezeDirectMessage: false,
    onFollowClick: jest.fn(),
    onUnFollowClick: jest.fn(),
    onSendMessageClick: jest.fn(),
  };
  const userInformation = shallow(<UserInformation {...props} />);

  it("render", () => {
    expect(userInformation.exists());
  });
});
