import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { UserInformation } from ".";
import { USER } from "@fixtures";

describe("<UserInformation />", () => {
  const userInformation = shallow(<UserInformation user={USER} />);

  it("render", () => {
    expect(userInformation.exists());
  });
});
