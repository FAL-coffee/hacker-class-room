import { SpeechBallon } from "@/components/atoms/SpeechBallon";
import { Props } from "./types";
import theme from "@/styles/theme";

import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
export const Message = ({ ...props }: Props) => {
  const postedDate = new Date(
    props.message.postedAt.seconds * 1000 +
      props.message.postedAt.nanoseconds / 1000000
  );

  const month = postedDate.getMonth() + 1;
  const day = postedDate.getDay();
  const hours = postedDate.getHours();
  const minutes = postedDate.getMinutes();
  const seconds = postedDate.getSeconds();

  const DateTime = `${month}/${day} ${hours}:${minutes}:${seconds}`;

  // console.log(Theme);
  return (
    <>
      {props.isMine ? (
        <Stack id="message-is_mine" direction="row">
          <div
            id="message-speech-container"
            style={{ textAlign: "right", marginRight: 15 }}
          >
            <Typography id="message-user_displayname" variant="body2">
              {props.user.displayName}
            </Typography>
            <SpeechBallon
              color={theme.palette.info.light}
              tail="right"
              value={props.message.value}
            />
            <Typography id="message-date_time" variant="body2" gutterBottom>
              {DateTime}
            </Typography>
          </div>
          <Avatar
            id="message-user_avatar"
            alt={props.user.displayName}
            src={props.user.photoURL}
            style={{ margin: "24px 0 0 0", cursor: "pointer" }}
            onClick={() => props.onIconClick(props.user.uid)}
          />
        </Stack>
      ) : (
        // isnt mine
        <Stack id="message-is_not_mine" direction="row" spacing={2}>
          <Avatar
            id="message-user_avatar"
            alt={props.user.displayName}
            src={props.user.photoURL}
            style={{ margin: "24px 0 0 0", cursor: "pointer" }}
            onClick={() => props.onIconClick(props.user.uid)}
          />
          <div>
            <Typography id="message-user_displayname" variant="body2">
              {props.user.displayName}
            </Typography>
            <SpeechBallon
              color={theme.palette.info.light}
              tail="left"
              value={props.message.value}
            />
            <Typography id="message-date_time" variant="body2" gutterBottom>
              {DateTime}
            </Typography>
          </div>
        </Stack>
      )}
    </>
  );
};

export default Message;
