import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { MessagePostForm } from "@components/molecules";
import { Chats } from "@components/organisms";
import { USER } from "./fixture";
import { IMessage } from "@/types";
import { Timestamp } from "@/plugin/firebase";
import { ChatRoom } from ".";

const SChatDisplayArea = () => {
  const MESSAGE: IMessage = {
    value: `test message\nhello! this is storybook! You can also run the maximum width test at the same time.`,
    postedAt: Timestamp.fromDate(new Date()),
    user: USER,
  };
  const props = {
    user: USER,
    messages: [MESSAGE],
  };
  return <Chats {...props} />;
};

const SMessagePostForm = () => {
  const props = {
    loggedIn: false,
    onSubmit: action("onSubmit"),
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
