import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { GoogleSigninButton } from ".";

describe("<GoogleSigninButton />", () => {
  const googleSigninButton = shallow(
    <GoogleSigninButton onClick={() => jest.fn()} />
  );

  it("render", () => {
    expect(googleSigninButton.exists());
  });
});
