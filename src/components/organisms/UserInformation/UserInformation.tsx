import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { SpeechBallon } from "@components/atoms";

import { Props } from "./types";

interface FollowButtonProps {
  following: boolean;
  onClick: () => void;
}
const FollowButton = ({ ...props }: FollowButtonProps) => {
  return (
    <>
      {props.following ? (
        <Button
          fullWidth
          variant="contained"
          endIcon={<ArrowDropUpIcon />}
          onClick={props.onClick}
        >
          Un Follow
        </Button>
      ) : (
        <Button
          fullWidth
          variant="outlined"
          endIcon={<KeyboardArrowDownIcon />}
          onClick={props.onClick}
        >
          Follow
        </Button>
      )}
    </>
  );
};

interface DirectMessageIconButtonProps {
  disabled: boolean;
  onClick: () => void;
}
const DirectMessageIconButton = ({
  ...props
}: DirectMessageIconButtonProps) => {
  return (
    <span style={{ display: "inline-flex" }}>
      {props.disabled ? (
        <></>
      ) : (
        <IconButton color="primary" onClick={props.onClick}>
          <MailOutlineIcon />
        </IconButton>
      )}
    </span>
  );
};

export const UserInformation = ({
  freezeDirectMessage = false,
  following = false,
  ...props
}: Props) => {
  const handleUnFollow = () => {
    if (!props.isMe && !!following && !!props.onUnFollowClick)
      props.onUnFollowClick(props.user.uid);
  };

  const handleFollow = () => {
    if (!props.isMe && !following && !!props.onFollowClick)
      props.onFollowClick(props.user.uid);
  };

  const handleSendMessage = () => {
    if (!props.isMe && !!props.onSendMessageClick)
      props.onSendMessageClick(props.user.uid);
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
        }}
      >
        <Stack
          direction="column"
          sx={{
            alignItems: "center",
          }}
          spacing={2}
        >
          <Avatar
            alt={props.user.displayName}
            src={props.user.photoURL}
            sx={{ width: 126, height: 126 }}
          />
          <Typography variant="h3">{props.user.displayName}</Typography>
          {!!props.user.message && (
            <SpeechBallon
              tail="top"
              color="#f8bbd0"
              value={props.user.message}
            />
          )}
          {!props.isMe && (
            <Stack direction="row" sx={{ width: "100%" }} spacing={1}>
              <FollowButton
                following={following}
                onClick={() => (following ? handleFollow() : handleUnFollow())}
              />
              <DirectMessageIconButton
                onClick={handleSendMessage}
                disabled={freezeDirectMessage}
              />
            </Stack>
          )}
        </Stack>
      </Box>

      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
        }}
      >
        <Stack
          direction="column"
          sx={{
            alignItems: "center",
          }}
          spacing={1}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
            }}
            spacing={1}
          >
            <Avatar
              alt={props.user.displayName}
              src={props.user.photoURL}
              sx={{ width: 48, height: 48 }}
            />
            <Typography variant="subtitle1">
              {props.user.displayName}
            </Typography>
            {!props.isMe && (
              <DirectMessageIconButton
                onClick={handleSendMessage}
                disabled={freezeDirectMessage}
              />
            )}
          </Stack>
          {!!props.user.message && (
            <SpeechBallon
              tail="top"
              color="#f8bbd0"
              value={props.user.message}
            />
          )}
          {!props.isMe && (
            <FollowButton
              following={following}
              onClick={() => (following ? handleFollow() : handleUnFollow())}
            />
          )}
        </Stack>
      </Box>
    </>
  );
};
