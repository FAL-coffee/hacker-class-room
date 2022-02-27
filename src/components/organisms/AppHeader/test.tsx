import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { GoogleSigninButton } from "@components/atoms";
import { AppHeader, links, userMenu } from ".";
import { USER } from "@fixtures";
import Avatar from "@mui/material/Avatar";

describe("<AppHeader />", () => {
  const props = {
    user: USER,
    onLogoClick: jest.fn(),
    onUserMenuClick: jest.fn(),
    onLinkClick: jest.fn(),
    onGoogleSigninClick: jest.fn(),
  };
  const appHeader = shallow(<AppHeader {...props} />);

  it("render", () => {
    expect(appHeader.exists());
  });

  it("logo click simulate", () => {
    appHeader.find("#app-header_logoimage_btn_under-md").simulate("click");
    expect(props.onLogoClick).toBeCalled();
  });

  it("The user-menu is displayed only when the user is logged in.", () => {
    appHeader.setProps({ user: null });
    expect(appHeader.find("app-header_user-wrapper").exists()).toBeFalsy();
    appHeader.setProps({ user: USER });
    expect(appHeader.find("app-header_user-wrapper").exists());
  });

  it("The avatar will be displayed correctly.", () => {
    expect(appHeader.find(Avatar).props().src).toEqual(props.user.photoURL);
    expect(appHeader.find(Avatar).props().alt).toEqual(props.user.displayName);
  });

  it("userMenus click simulate", () => {
    userMenu.forEach((item, i: number) => {
      appHeader
        .find(`#app-header_user-menu_item-${item.key}`)
        .simulate("click");
      // expect(props.onUserMenuClick(item.key)).toHaveBeenCalled();
      expect(props.onUserMenuClick).toHaveBeenCalled();
    });
  });

  it("GoogleSigninButton is displayed only when you are not signed in.", () => {
    appHeader.setProps({ user: null });
    expect(appHeader.find(GoogleSigninButton).exists());
    appHeader.setProps({ user: USER });
    expect(appHeader.find(GoogleSigninButton).exists()).toBeFalsy();
  });

  it("GoogleSigninButton click simulate", () => {
    appHeader.setProps({ user: null });
    appHeader.find(GoogleSigninButton).simulate("click");
    expect(props.onGoogleSigninClick).toHaveBeenCalled();
  });

  describe("when md", () => {
    beforeEach(() => {
      appHeader.setProps(props);
    });
    it("links click simulate", () => {
      links.forEach((link, i: number) => {
        appHeader.find(`#app-header_link-md-${link.key}`).simulate("click");
        expect(props.onLinkClick).toHaveBeenCalled();
        // expect(props.onLinkClick(link.key)).toHaveBeenCalled();
      });
    });
  });

  describe("when xs", () => {
    beforeEach(() => {
      appHeader.setProps(props);
    });
    it("links click simulate", () => {
      links.forEach((link, i: number) => {
        appHeader.find(`#app-header_link-xs-${link.key}`).simulate("click");
        expect(props.onLinkClick).toHaveBeenCalled();
        // expect(props.onLinkClick(link.key)).toHaveBeenCalled();
      });
    });
  });
});
