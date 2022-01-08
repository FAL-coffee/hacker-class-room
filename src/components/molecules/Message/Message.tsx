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
        <Stack direction="row">
          <div style={{ textAlign: "right", marginRight: 15 }}>
            <Typography variant="body2">{props.user.displayName}</Typography>
            <SpeechBallon
              color={theme.palette.info.light}
              tail="right"
              value={props.message.value}
            />
            <Typography variant="body2" gutterBottom>
              {DateTime}
            </Typography>
          </div>
          <Avatar
            alt={props.user.displayName}
            src={props.user.photoURL}
            style={{ margin: "24px 0 0 0", cursor: "pointer" }}
            onClick={() => props.onIconClick(props.user.uid)}
          />
        </Stack>
      ) : (
        // isnt mine
        <Stack direction="row" spacing={2}>
          <Avatar
            alt={props.user.displayName}
            src={props.user.photoURL}
            style={{ margin: "24px 0 0 0", cursor: "pointer" }}
            onClick={() => props.onIconClick(props.user.uid)}
          />
          <div>
            <Typography variant="body2">{props.user.displayName}</Typography>
            <SpeechBallon
              color={theme.palette.info.light}
              tail="left"
              value={props.message.value}
            />
            <Typography variant="body2" gutterBottom>
              {DateTime}
            </Typography>
          </div>
        </Stack>
      )}
    </>
  );
};

export default Message;
