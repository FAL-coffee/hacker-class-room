import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { UserInformation, FollowButton, DirectMessageIconButton } from ".";
import { SpeechBallon } from "@components/atoms";
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

  describe("when md", () => {
    let userInformationWrapper = userInformation.find("#user_information-md");
    beforeEach(() => {
      userInformation.setProps(props);
      userInformationWrapper = userInformation.find("#user_information-md");
    });

    it("render", () => {
      expect(userInformationWrapper.exists());
    });

    it("render users avatar", () => {
      expect(userInformationWrapper.find("#user_information-avatar").exists());
      expect(
        userInformationWrapper.find("#user_information-avatar").props().alt
      ).toEqual(props.user.displayName);
      expect(
        userInformationWrapper.find("#user_information-avatar").props().src
      ).toEqual(props.user.photoURL);
    });

    it("render users displayname", () => {
      expect(userInformationWrapper.find("#user_information-name").exists());
      expect(
        userInformationWrapper.find("#user_information-name").text()
      ).toEqual(props.user.displayName);
    });

    it("render users message when user have message", () => {
      expect(userInformationWrapper.find(SpeechBallon).exists());
      expect(userInformationWrapper.find(SpeechBallon).props().value).toEqual(
        props.user.message
      );
    });

    it("not render users message when user not have message", () => {
      userInformation.setProps({ user: { ...USER, message: null } });
      userInformationWrapper = userInformation.find("#user_information_md");
      expect(userInformationWrapper.find(SpeechBallon).exists()).toBeFalsy();
    });

    it("render FollowButton and DirectMesageIconButton when isMe is true", () => {
      expect(userInformationWrapper.find(FollowButton).exists());
      expect(userInformationWrapper.find(DirectMessageIconButton).exists());

      expect(
        userInformationWrapper.find(FollowButton).props().following
      ).toEqual(props.following);

      expect(
        userInformationWrapper.find(DirectMessageIconButton).props().disabled
      ).toEqual(props.freezeDirectMessage);
    });

    it("not render FollowButton and DirectMesageIconButton when isMe is fase", () => {
      userInformation.setProps({ isMe: true });
      userInformationWrapper = userInformation.find("#user_information-md");
      expect(userInformationWrapper.find(FollowButton).exists()).toBeFalsy();
      expect(
        userInformationWrapper.find(DirectMessageIconButton).exists()
      ).toBeFalsy();
    });
  });

  describe("when xs", () => {
    let userInformationWrapper = userInformation.find("#user_information-xs");
    beforeEach(() => {
      userInformation.setProps(props);
      userInformationWrapper = userInformation.find("#user_information-xs");
    });

    it("render", () => {
      expect(userInformationWrapper.exists());
    });

    it("render users avatar", () => {
      expect(userInformationWrapper.find("#user_information-avatar").exists());
      expect(
        userInformationWrapper.find("#user_information-avatar").props().alt
      ).toEqual(props.user.displayName);
      expect(
        userInformationWrapper.find("#user_information-avatar").props().src
      ).toEqual(props.user.photoURL);
    });

    it("render users displayname", () => {
      expect(userInformationWrapper.find("#user_information-name").exists());
      expect(
        userInformationWrapper.find("#user_information-name").text()
      ).toEqual(props.user.displayName);
    });

    it("render users message when user have message", () => {
      expect(userInformationWrapper.find(SpeechBallon).exists());
      expect(userInformationWrapper.find(SpeechBallon).props().value).toEqual(
        props.user.message
      );
    });

    it("not render users message when user not have message", () => {
      userInformation.setProps({ user: { ...USER, message: null } });
      userInformationWrapper = userInformation.find("#user_information_md");
      expect(userInformationWrapper.find(SpeechBallon).exists()).toBeFalsy();
    });

    it("render FollowButton and DirectMesageIconButton when isMe is true", () => {
      expect(userInformationWrapper.find(FollowButton).exists());
      expect(userInformationWrapper.find(DirectMessageIconButton).exists());

      expect(
        userInformationWrapper.find(FollowButton).props().following
      ).toEqual(props.following);

      expect(
        userInformationWrapper.find(DirectMessageIconButton).props().disabled
      ).toEqual(props.freezeDirectMessage);
    });

    it("not render FollowButton and DirectMesageIconButton when isMe is fase", () => {
      userInformation.setProps({ isMe: true });
      userInformationWrapper = userInformation.find("#user_information-xs");
      expect(userInformationWrapper.find(FollowButton).exists()).toBeFalsy();
      expect(
        userInformationWrapper.find(DirectMessageIconButton).exists()
      ).toBeFalsy();
    });
  });
});
