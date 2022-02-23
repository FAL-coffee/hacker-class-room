import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { UserBar } from "@/components/molecules";
import { UserBarList } from ".";
import { Props } from "./types";
import { IUser } from "@types";
import { USER } from "@fixtures";

const getChatRoomDemoDatas = (): IUser[] => {
  let userDemoDatas: IUser[] = [];
  for (let i = 0; i < 5; i++) {
    userDemoDatas.push({ ...USER, uid: USER.uid + i });
  }
  return userDemoDatas;
};

describe("<UserBarList />", () => {
  const props: Props = {
    onUserClick: jest.fn(),
    users: getChatRoomDemoDatas(),
  };
  const userBarList = shallow(<UserBarList {...props} />);

  it("render", () => {
    expect(userBarList.exists());
  });

  it("All userBars will receive their props correctly.", () => {
    props.users.forEach((user: IUser, i: number) => {
      expect(
        userBarList
          .find(`#user_bar_list-user_bar_${user.uid}`)
          .find(UserBar)
          .props().user
      ).toEqual(user);

      expect(
        userBarList
          .find(`#user_bar_list-user_bar_${user.uid}`)
          .find(UserBar)
          .props().onClick
      ).toEqual(props.onUserClick);
    });
  });
});
