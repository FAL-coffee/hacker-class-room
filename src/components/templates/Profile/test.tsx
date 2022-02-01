import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { Profile } from ".";
import * as fixtures from "./fixture";

describe("<Profile />", () => {
  const profile = shallow(
    <Profile
      userInformationArea={<fixtures.FUserInformation />}
      listTabArea={<fixtures.FListTab />}
    />
  );

  it("render", () => {
    expect(profile.exists());
  });
});
