import React from "react";
import { storiesOf } from "@storybook/react";
import { ChatRoomList } from ".";
import * as fixtures from "./fixture";

storiesOf("@components/template/ChatRoomList", module)
  .addParameters({ component: ChatRoomList })
  .add("default", () => (
    <ChatRoomList
      ChatRoomListDisplayArea={<fixtures.FChatRoomListDisplayArea />}
    />
  ));
