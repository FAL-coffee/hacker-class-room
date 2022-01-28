import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { MessagePostForm } from "@components/molecules";
import { Chats } from "@components/organisms";
import { USER, MESSAGE } from "@fixtures";
import { ChatRoom } from ".";

const SChatDisplayArea = () => {
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
