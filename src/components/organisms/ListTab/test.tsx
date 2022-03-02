import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import "jsdom-global/register";
// import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
// import Tabs from "@mui/material/Tabs";

// import { ListTab, TabPanel } from ".";
import { ListTab } from ".";
import { TABS } from "./fixture";

describe("<ListTab />", () => {
  const listTabs = shallow(<ListTab tabs={TABS} />);

  it("render", () => {
    expect(listTabs.exists());
  });

  it("Tab should be displayed for all the props passed.", () => {
    TABS.forEach((tab, i: number) => {
      const listTab = listTabs.find(Tab).find(`#list-tab-${i}`);
      expect(listTab.exists());
      expect(listTab.prop("aria-controls")).toEqual(`list-tabpanel-${i}`);
      expect(listTab.prop("label")).toEqual(tab.name);
    });
  });

  // it("The component that appears when you click on the tab should change.", () => {
  // const listTabsWrapper = shallow(<ListTab tabs={TABS} />);
  // TABS.forEach((tab, i: number) => {
  //   const tabs = listTabsWrapper.find(Tabs);
  //   // tabs.simulate("change", {
  //   //   newValue: tabs.find(`#list-tab-${i}`).first(),
  //   // });
  //   tabs.find(`#list-tab-${i}`).first().simulate("click");

  //   const tabpanel = listTabsWrapper
  //     .find(TabPanel)
  //     .find(`#list-tabpanel-${i}`);
  //   expect(tabpanel.exists());
  //   expect(tabpanel.prop("aria-labelledby")).toEqual(`list-tab-${i}`);
  //   for (let j = 0; j < TABS.length; j++) {
  //     if (i === j) return;
  //     expect(
  //       listTabsWrapper.find(TabPanel).find(`#list-tabpanel-${i}`).exists()
  //     );
  //     expect(
  //       listTabsWrapper
  //         .find(TabPanel)
  //         .find(`#list-tabpanel-${i}`)
  //         .prop("hidden")
  //     ).toBeTruthy();
  //   }

  //   expect(tabpanel.find(Box).props().children).toEqual(tab.component);
  // });
  // });
});
