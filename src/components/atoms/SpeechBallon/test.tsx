import React from "react";
import { configure, mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "jest-styled-components";
import "jsdom-global/register";

configure({ adapter: new Adapter() });

import { SpeechBallon } from ".";

describe("<SpeechBallon />", () => {
  const speechBallon = shallow(
    <SpeechBallon value="" tail="top" color="" textColor="" />
  );

  it("render", () => {
    expect(speechBallon.exists());
  });

  it("renders text", () => {
    expect(speechBallon.text()).toEqual("");
    speechBallon.setProps({ value: "renders text test" });
    expect(speechBallon.text()).toEqual("renders text test");
  });

  it("renders color", () => {
    const blueColorsSpeechBallon = mount(
      <SpeechBallon value="" tail="top" color="blue" textColor="" />
    );
    expect(blueColorsSpeechBallon).toHaveStyleRule("background", "blue");
  });

  it("renders text color", () => {
    const blueTextColorsSpeechBallon = mount(
      <SpeechBallon value="" tail="top" color="" textColor="blue" />
    );
    expect(blueTextColorsSpeechBallon).toHaveStyleRule("color", "blue");
  });

  it("render margins vector when props tails", () => {
    speechBallon.setProps({ tail: "top" });
    expect(speechBallon).toHaveStyleRule("margin-top", "13px");

    speechBallon.setProps({ tail: "right" });
    expect(speechBallon).toHaveStyleRule("margin-left", "-13px");

    speechBallon.setProps({ tail: "bottom" });
    expect(speechBallon).toHaveStyleRule("margin-bottom", "13px");

    speechBallon.setProps({ tail: "left" });
    expect(speechBallon).toHaveStyleRule("margin-right", "-13px");
  });

  // expect(speechBallon).toMatchSnapshot();
});
