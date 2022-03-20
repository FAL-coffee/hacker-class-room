import React from "react";
import { shallow, mount } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { SpeechBallon } from "@/components/atoms/SpeechBallon";
import { MESSAGE, USER } from "@fixtures";

import { Message } from ".";
import { Props } from "./types";

describe("<Message />", () => {
  const props: Required<Props> = {
    user: USER,
    message: MESSAGE,
    isMine: true,
    onUserClick: jest.fn(),
  };
  const postedDate = MESSAGE.postedAt;

  const month = postedDate.getMonth() + 1;
  const day = postedDate.getDate();
  const hours = postedDate.getHours();
  const minutes = postedDate.getMinutes();
  const seconds = postedDate.getSeconds();

  const DateTime = `${month}/${day} ${hours}:${minutes}:${seconds}`;

  const message = shallow(<Message {...props} />);
  it("render", () => {
    expect(message.exists());
  });

  describe("isMine=true", () => {
    props.isMine = true;
    const mineMessageWrapper = shallow(<Message {...props} />);
    mineMessageWrapper.update();
    it("render", () => {
      expect(mineMessageWrapper.exists());
    });

    // isMine=true時、#message-is_mine要素が表示され、#message-is_not_mine要素が表示されないこと
    it("Switching the display of elements", () => {
      // expect(messageIsMine.length).toBe(1);
      expect(mineMessageWrapper.find("#message_is-mine").length).toBe(1);
      expect(mineMessageWrapper.find("#message_is-not-mine").length).toBe(0);
    });

    it("renders displayName", () => {
      expect(
        mineMessageWrapper.find("#message_user-displayname").text()
      ).toEqual(USER.displayName);
    });

    it("renders dateTime", () => {
      const message = mount(<Message {...props} />);
      expect(message.find("#message_date-time").first().text()).toEqual(
        DateTime
      );
    });

    it("render users icon", () => {
      expect(
        mineMessageWrapper.find("#message_user-avatar").props().src
      ).toEqual(USER.photoURL);
      expect(
        mineMessageWrapper.find("#message_user-avatar").props().alt
      ).toEqual(USER.displayName);
    });

    it("render SpeechBallon tail right", () => {
      expect(mineMessageWrapper.find(SpeechBallon).props().tail).toEqual(
        "right"
      );
      expect(mineMessageWrapper.find(SpeechBallon).props().value).toEqual(
        MESSAGE.value
      );
    });

    // icon click時、onUserClickイベントが発火する事
    it("Ignition of the event", () => {
      mineMessageWrapper.find("#message_user-avatar").simulate("click", () => {
        expect(props.onUserClick).toHaveBeenCalled();
      });
    });
  });

  describe("isMine=false", () => {
    props.isMine = false;
    const notMineMessageWrapper = shallow(<Message {...props} />);
    notMineMessageWrapper.update();
    it("render", () => {
      expect(notMineMessageWrapper.exists());
    });

    // isMine=false時、#message-is_mine要素が表示され、#message-is_not_mine要素が表示されないこと
    it("Switching the display of elements", () => {
      expect(notMineMessageWrapper.find("#message_is-not-mine").length).toBe(1);
      expect(notMineMessageWrapper.find("#message_is-mine").length).toBe(0);
    });

    it("renders displayName", () => {
      expect(
        notMineMessageWrapper.find("#message_user-displayname").text()
      ).toEqual(USER.displayName);
    });

    it("renders dateTime", () => {
      const message = mount(<Message {...props} />);
      expect(message.find("#message_date-time").first().text()).toEqual(
        DateTime
      );
    });

    it("render users icon", () => {
      expect(
        notMineMessageWrapper.find("#message_user-avatar").props().src
      ).toEqual(USER.photoURL);
      expect(
        notMineMessageWrapper.find("#message_user-avatar").props().alt
      ).toEqual(USER.displayName);
    });

    it("render SpeechBallon tail left", () => {
      expect(notMineMessageWrapper.find(SpeechBallon).props().tail).toEqual(
        "left"
      );
      expect(notMineMessageWrapper.find(SpeechBallon).props().value).toEqual(
        MESSAGE.value
      );
    });

    // icon click時、onUserClickイベントが発火する事
    it("Ignition of the event", () => {
      notMineMessageWrapper
        .find("#message_is-not-mine")
        .find("#message_user-avatar")
        .simulate("click", () => {
          expect(props.onUserClick).toHaveBeenCalled();
        });
    });
  });
});
