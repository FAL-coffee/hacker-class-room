import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { ChatRoomCard } from "@/components/molecules";
import { ChatRoomCardList } from ".";
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

describe("<ChatRoomCardList />", () => {
  const props: Props = {
    onOpenClick: jest.fn(),
    onTagClick: jest.fn(),
    onUserClick: jest.fn(),
    chatRooms: getChatRoomDemoDatas(),
  };
  const chatRoomCardList = shallow(<ChatRoomCardList {...props} />);
  it("All chatroomcards will receive their props correctly.", () => {
    props.chatRooms.forEach((chatRoom: IChatRoom, i: number) => {
      expect(
        chatRoomCardList
          .find(`#chat_room_card_list-chat_room_card_${chatRoom.id}`)
          .find(ChatRoomCard)
          .props().chatRoom
      ).toEqual(chatRoom);

      expect(
        chatRoomCardList
          .find(`#chat_room_card_list-chat_room_card_${chatRoom.id}`)
          .find(ChatRoomCard)
          .props().onOpenClick
      ).toEqual(props.onOpenClick);

      expect(
        chatRoomCardList
          .find(`#chat_room_card_list-chat_room_card_${chatRoom.id}`)
          .find(ChatRoomCard)
          .props().onUserClick
      ).toEqual(props.onUserClick);

      expect(
        chatRoomCardList
          .find(`#chat_room_card_list-chat_room_card_${chatRoom.id}`)
          .find(ChatRoomCard)
          .props().onTagClick
      ).toEqual(props.onTagClick);
    });
  });
});
