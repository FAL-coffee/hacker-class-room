import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { SpeechBallon } from "@components/atoms";

import { Props } from "./types";
import { DirectMessageIconButton, FollowButton } from ".";

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
        id="user_information-md"
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
            id="user_information-avatar"
            alt={props.user.displayName}
            src={props.user.photoURL}
            sx={{ width: 126, height: 126 }}
          />
          <Typography variant="h3" id="user_information-name">
            {props.user.displayName}
          </Typography>
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
                onClick={() => (following ? handleUnFollow() : handleFollow())}
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
        id="user_information-xs"
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
              id="user_information-avatar"
              alt={props.user.displayName}
              src={props.user.photoURL}
              sx={{ width: 48, height: 48 }}
            />
            <Typography variant="subtitle1" id="user_information-name">
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
              onClick={() => (following ? handleUnFollow() : handleFollow())}
            />
          )}
        </Stack>
      </Box>
    </>
  );
};
