import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import { MessagePostForm } from "@components/molecules";
import { Chats } from "@components/organisms";
import { USER } from "./fixture";
import { IMessage } from "@/types";
import { Timestamp } from "@/plugin/firebase";
import { ChatRoom } from ".";

const SChatDisplayArea = () => {
  const MESSAGE: IMessage = {
    value: `test message`,
    postedAt: Timestamp.fromDate(new Date()),
    postedUid: `mockUsersUID`,
  };
  const props = {
    user: USER,
    userMessageList: [
      { user: { ...USER, uid: USER.uid + "00" }, message: MESSAGE },
      { user: USER, message: MESSAGE },
    ],
  };
  return <Chats {...props} />;
};

const SMessagePostForm = () => {
  const props = {
    onSubmit: action,
  };
  return <MessagePostForm {...props} />;
};

storiesOf("@components/template/ChatRoom", module)
  .addParameters({ component: ChatRoom })
  .add("default", () => (
    <ChatRoom
      ChatDisplayArea={<SChatDisplayArea />}
      MessagePostForm={<SMessagePostForm />}
    />
  ));