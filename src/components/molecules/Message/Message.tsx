import { useState, useEffect } from "react";

import { SpeechBallon } from "@/components/atoms/SpeechBallon";
import { Props } from "./types";
import theme from "@/styles/theme";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
export const Message = ({
  user = {
    uid: "",
    displayName: "",
    email: "",
    message: "",
    lastLoginAt: new Date("1900-01-01T00:00:00"),
  },
  ...props
}: Props) => {
  const [dateTime, setDateTime] = useState<string>();

  useEffect(() => {
    const postedDate = props.message.postedAt;
    const month = postedDate.getMonth() + 1;
    const day = postedDate.getDate();
    const hours = postedDate.getHours();
    const minutes = postedDate.getMinutes();
    const seconds = postedDate.getSeconds();

    setDateTime(`${month}/${day} ${hours}:${minutes}:${seconds}`);
  }, [props.message.postedAt]);

  const handleUserClick = () => {
    if (!!props.message.user && !!props.onUserClick)
      props.onUserClick(props.message.user.uid);
  };
  return (
    <>
      {props.isMine ? (
        <Stack id="message_is-mine" direction="row">
          <div
            id="message-speech-container"
            style={{ textAlign: "right", marginRight: 15 }}
          >
            <Typography id="message_user-displayname" variant="body2">
              {user.displayName}
            </Typography>
            <SpeechBallon
              color={theme.palette.info.light}
              tail="right"
              value={props.message.value}
            />
            <Typography id="message_date-time" variant="body2" gutterBottom>
              {dateTime}
            </Typography>
          </div>
          <Avatar
            id="message_user-avatar"
            alt={user.displayName}
            src={user.photoURL}
            style={{ margin: "24px 0 0 0", cursor: "pointer" }}
            onClick={handleUserClick}
          />
        </Stack>
      ) : (
        // isnt mine
        <Stack id="message_is-not-mine" direction="row" spacing={2}>
          <Avatar
            id="message_user-avatar"
            alt={user.displayName}
            src={user.photoURL}
            style={{ margin: "24px 0 0 0", cursor: "pointer" }}
            onClick={handleUserClick}
          />
          <div>
            <Typography id="message_user-displayname" variant="body2">
              {user.displayName}
            </Typography>
            <SpeechBallon
              color={theme.palette.info.light}
              tail="left"
              value={props.message.value}
            />
            <Typography id="message_date-time" variant="body2" gutterBottom>
              {dateTime}
            </Typography>
          </div>
        </Stack>
      )}
    </>
  );
};
