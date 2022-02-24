import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { Message } from "@/components/molecules";
import { Chats } from ".";
import { USER, MESSAGE } from "@fixtures";
import { IMessage, IUser } from "@types";
import { Props } from "./types";

const getMessageDemoDatas = () => {
  const messages: IMessage[] = [];
  for (let i = 0; i < 5; i++) {
    const user: IUser = {
      ...MESSAGE?.user,
      displayName: `${MESSAGE.user}_${i}`,
      uid: `${MESSAGE.user}_${i}`,
    } as IUser;
    messages.push({ ...MESSAGE, value: `${MESSAGE.value}_${i}`, user: user });
  }
  return messages;
};

const isMine = (message: IMessage, user: IUser): boolean => {
  if (!message.user) return false;
  else return message.user.uid === user?.uid;
};

describe("<Chats />", () => {
  const props: Props = {
    user: USER,
    messages: getMessageDemoDatas(),
    onUserClick: jest.fn(),
  };
  const chats = shallow(<Chats {...props} />);

  it("render", () => {
    expect(chats.exists());
  });

  it("The textAlign of the message component must be passed correctly.", () => {
    props.messages.forEach((message: IMessage, i: number) => {
      expect(chats.find(`#chats-message_container_${i}`).prop("sx")).toEqual({
        mb: 2,
        textAlign: isMine(message, props.user) ? "right" : "left",
      });
    });
  });

  it("All props must be passed correctly in the message.", () => {
    props.messages.forEach((message: IMessage, i: number) => {
      const messageWrapper = chats
        .find(`#chats-message_container_${i}`)
        .find(Message);
      expect(messageWrapper.props().user).toEqual(message.user);
      expect(messageWrapper.props().message).toEqual(message);
      expect(messageWrapper.props().isMine).toEqual(
        isMine(message, props.user)
      );
      // expect(messageWrapper.props().onUserClick).toEqual();
    });
  });
});
