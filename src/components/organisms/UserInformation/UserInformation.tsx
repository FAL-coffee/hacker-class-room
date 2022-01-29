import * as React from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Props } from "./types";

export const UserInformation = ({ ...props }: Props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack
          direction="column"
          sx={{
            alignItems: "center",
          }}
        >
          <Avatar
            alt={props.user.displayName}
            src={props.user.photoURL}
            sx={{ width: 126, height: 126 }}
          />
          <Typography variant="h3">{props.user.displayName}</Typography>
        </Stack>
      </Box>
    </>
  );
};
