import { SpeechBallon } from "@/components/atoms/SpeechBallon";
import { Props } from "./types";
import theme from "@/styles/theme";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
export const Message = ({
  user = { uid: "", displayName: "", photoURL: "", email: "" },
  ...props
}: Props) => {
  const postedDate = new Date(
    props.message.postedAt.seconds * 1000 +
      props.message.postedAt.nanoseconds / 1000000
  );

  const month = postedDate.getMonth() + 1;
  const day = postedDate.getDate();
  const hours = postedDate.getHours();
  const minutes = postedDate.getMinutes();
  const seconds = postedDate.getSeconds();

  const DateTime = `${month}/${day} ${hours}:${minutes}:${seconds}`;

  // console.log(Theme);
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
              {DateTime}
            </Typography>
          </div>
          <Avatar
            id="message_user-avatar"
            alt={user.displayName}
            src={user.photoURL}
            style={{ margin: "24px 0 0 0", cursor: "pointer" }}
            onClick={() => props.onIconClick(user.uid)}
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
            onClick={() => props.onIconClick(user.uid)}
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
              {DateTime}
            </Typography>
          </div>
        </Stack>
      )}
    </>
  );
};
