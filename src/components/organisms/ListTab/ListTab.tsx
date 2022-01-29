import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { Props, tabData } from "./types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`list-tabpanel-${index}`}
      aria-labelledby={`list-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `list-tab-${index}`,
    "aria-controls": `list-tabpanel-${index}`,
  };
};

export const ListTab = ({ ...props }: Props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="scrollable list tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          {props.tabs.map((tab: tabData, i: number) => (
            <Tab key={i} label={tab.name} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>
      {props.tabs.map((tab: tabData, i: number) => (
        <TabPanel key={i} value={value} index={i}>
          {tab.component}
        </TabPanel>
      ))}
    </Container>
  );
};
