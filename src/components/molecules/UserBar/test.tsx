import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";
import { Bar } from "@/components/atoms";
import { UserBar } from ".";
import { Props } from "./types";
import { USER } from "@fixtures";

describe("<UserBar />", () => {
  const props: Props = {
    user: USER,
    onClick: jest.fn(),
  };
  const userBar = shallow(<UserBar {...props} />);

  it("render", () => {
    expect(userBar.exists());
  });

  it("Passing the value correctly", () => {
    expect(userBar.find(Bar).props().value).toEqual(USER.displayName);
    expect(userBar.find(Bar).props().avatarImage).toEqual(USER.photoURL);
  });

  it("When clicked, the event will fire", () => {
    userBar.simulate("click", () => {
      expect(props.onClick(USER.uid)).toHaveBeenCalled();
    });
  });
});
