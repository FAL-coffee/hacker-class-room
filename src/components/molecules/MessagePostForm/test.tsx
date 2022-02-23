import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";

import { MessagePostForm } from ".";
import { Props } from "./types";

describe("<MessagePostForm />", () => {
  let props: Props = {
    onSubmit: jest.fn(),
    loggedIn: true,
  };
  const messagePostForm = shallow(<MessagePostForm {...props} />);

  it("render", () => {
    expect(messagePostForm.exists());
  });

  it("message-post-form_label text is Message", () => {
    expect(messagePostForm.find("#message-post-form_label").text()).toEqual(
      "Message"
    );
  });

  it("message-post-form_label for message-post-form_input-box", () => {
    expect(
      messagePostForm.find("#message-post-form_label").props().htmlFor
    ).toEqual("message-post-form_input-box");
  });

  it("Ignition of the event", () => {
    messagePostForm
      .find("#message-post-form_input-box")
      .simulate("change", { target: { value: "this test value" } });
    messagePostForm
      .find("#message-post-form")
      .simulate("submit", { preventDefault() {} }, () => {
        expect(props.onSubmit("this test value")).toHaveBeenCalled();
      });
  });
});
