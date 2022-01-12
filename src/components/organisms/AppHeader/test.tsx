import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { AppHeader } from ".";
import { USER } from "./fixture";
import { Props } from "./types";

describe("<AppHeader />", () => {
  const props: Props = {
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
});
