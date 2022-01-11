import React from "react";
import { mount, shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { MessagePostForm } from ".";
import { Props } from "./types";

describe("<MessagePostForm />", () => {
  let props: Props = {
    onSubmit: jest.fn(),
  };
  const messagePostForm = shallow(<MessagePostForm {...props} />);

  it("render", () => {
    expect(messagePostForm.exists());
  });
});
