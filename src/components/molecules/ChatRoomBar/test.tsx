import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { ChatRoomBar } from ".";
import { Props } from "./types";
import { CHATROOM } from "@fixtures";
import { Bar, Tag } from "@/components/atoms";

describe("<ChatRoomBar />", () => {
  const props: Props = {
    onClick: jest.fn(),
    onTagClick: jest.fn(),
    onUserClick: jest.fn(),
    chatRoom: CHATROOM,
  };
  const chatRoomBar = shallow(<ChatRoomBar {...props} />);

  it("render", () => {
    expect(chatRoomBar.exists());
  });

  it("Ensure that the props are correctly passed on to the Bar component.", () => {
    expect(chatRoomBar.find(Bar).props().value).toEqual(props.chatRoom.name);
    expect(chatRoomBar.find(Bar).props().avatarImage).toEqual(
      props.chatRoom.iconURL
    );
    expect(chatRoomBar.find(Bar).props().onClick()).toEqual(
      props.onClick(props.chatRoom.id)
    );
    chatRoomBar.find(Bar).simulate("click", () => {
      expect(props.onClick(props.chatRoom.id)).toHaveBeenCalled();
    });
  });

  it("The owner's name will be displayed correctly.", () => {
    expect(chatRoomBar.find("#chat_room_bar-owner").text()).toEqual(
      `owner： ${props.chatRoom.owner.displayName}`
    );
  });

  it("All tags should be visible.", () => {
    props.chatRoom.tags.forEach((tag) => {
      const tagWrapper = chatRoomBar
        .find("#chat_room_bar-tags_area")
        .find(`#chat_room_bar-tag_${tag.id}`);
      expect(tagWrapper.find(Tag).props().id).toEqual(tag.id);
      expect(tagWrapper.find(Tag).props().value).toEqual(tag.value);
      tagWrapper.find(Tag).simulate("click", () => {
        expect(props.onTagClick(tag.genreId, tag.id)).toHaveBeenCalled();
      });
    });
  });
});
