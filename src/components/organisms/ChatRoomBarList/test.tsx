import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { ChatRoomBar } from "@/components/molecules";
import { ChatRoomBarList } from ".";
import { Props } from "./types";
import { CHATROOM } from "@fixtures";
import { IChatRoom } from "@/types";

const getChatRoomDemoDatas = (): IChatRoom[] => {
  let chatRoomDemoDatas: IChatRoom[] = [];
  for (let i = 0; i < 5; i++) {
    chatRoomDemoDatas.push({ ...CHATROOM, id: CHATROOM.id + i });
  }
  return chatRoomDemoDatas;
};

describe("<ChatRoomBarList />", () => {
  const props: Props = {
    onOpenClick: jest.fn(),
    onTagClick: jest.fn(),
    onUserClick: jest.fn(),
    chatRooms: getChatRoomDemoDatas(),
  };
  const chatRoomBarList = shallow(<ChatRoomBarList {...props} />);

  it("render", () => {
    expect(chatRoomBarList.exists());
  });

  it("All chatroombars will receive their props correctly.", () => {
    props.chatRooms.forEach((chatRoom: IChatRoom, i: number) => {
      expect(
        chatRoomBarList
          .find(`#chat_room_bar_list-chat_room_bar_${chatRoom.id}`)
          .find(ChatRoomBar)
          .props().chatRoom
      ).toEqual(chatRoom);

      expect(
        chatRoomBarList
          .find(`#chat_room_bar_list-chat_room_bar_${chatRoom.id}`)
          .find(ChatRoomBar)
          .props().onClick
      ).toEqual(props.onOpenClick);

      expect(
        chatRoomBarList
          .find(`#chat_room_bar_list-chat_room_bar_${chatRoom.id}`)
          .find(ChatRoomBar)
          .props().onUserClick
      ).toEqual(props.onUserClick);

      expect(
        chatRoomBarList
          .find(`#chat_room_bar_list-chat_room_bar_${chatRoom.id}`)
          .find(ChatRoomBar)
          .props().onTagClick
      ).toEqual(props.onTagClick);
    });
  });
});
