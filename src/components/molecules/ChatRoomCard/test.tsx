import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { ChatRoomCard } from ".";
import { Props } from "./types";
import { CHATROOM } from "@fixtures";
import { Tag } from "@/components/atoms";

describe("<ChatRoomCard />", () => {
  const props: Props = {
    onOpenClick: jest.fn(),
    onTagClick: jest.fn(),
    onUserClick: jest.fn(),
    chatRoom: CHATROOM,
  };
  const chatRoomCard = shallow(<ChatRoomCard {...props} />);

  it("render", () => {
    expect(chatRoomCard.exists());
  });

  it("The chatroom's name and avatar will be displayed correctly.", () => {
    expect(
      chatRoomCard.find("#chat_room_card-chat_room_icon_avatar").props().alt
    ).toEqual(`${props.chatRoom.name}`);
    expect(
      chatRoomCard.find("#chat_room_card-chat_room_icon_avatar").props().src
    ).toEqual(`${props.chatRoom.iconURL}`);

    expect(chatRoomCard.find("#chat_room_card-chat_room_name").text()).toEqual(
      `${props.chatRoom.name}`
    );
  });

  it("The owner's name and avatar will be displayed correctly.", () => {
    expect(
      chatRoomCard.find("#chat_room_card-chat_room_owner_avatar").props().alt
    ).toEqual(`${props.chatRoom.owner.displayName}`);
    expect(
      chatRoomCard.find("#chat_room_card-chat_room_owner_avatar").props().src
    ).toEqual(`${props.chatRoom.owner.photoURL}`);

    expect(chatRoomCard.find("#chat_room_card-chat_room_owner").text()).toEqual(
      `${props.chatRoom.owner.displayName}`
    );
  });

  it("The event should fire correctly when the user's icon is clicked.", () => {
    chatRoomCard
      .find("#chat_room_card-chat_room_owner")
      .simulate("click", () => {
        expect(props.onUserClick(props.chatRoom.owner.uid)).toHaveBeenCalled();
      });
  });

  it("All tags should be visible.", () => {
    props.chatRoom.tags.forEach((tag) => {
      const tagWrapper = chatRoomCard
        .find("#chat_room_card-tags_area")
        .find(`#chat_room_card-tag_${tag.id}`);
      expect(tagWrapper.find(Tag).props().id).toEqual(tag.id);
      expect(tagWrapper.find(Tag).props().value).toEqual(tag.value);
      tagWrapper.find(Tag).simulate("click", () => {
        expect(props.onTagClick(tag.id)).toHaveBeenCalled();
      });
    });
  });

  it("The event should fire correctly when the user's icon is clicked.", () => {
    chatRoomCard.find("#chat_room_card-open_button").simulate("click", () => {
      expect(props.onOpenClick(props.chatRoom.id)).toHaveBeenCalled();
    });
  });
});
