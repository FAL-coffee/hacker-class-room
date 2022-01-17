import React from "react";
import { Box } from "@mui/material";
import { Message } from "@/components/molecules";
import { Props, UserMessage } from "./types";
export const Chats = ({ ...props }: Props) => {
  const isMine = (userMessage: UserMessage): boolean => {
    return userMessage.user.uid === props.user?.uid;
  };

  const ref = React.createRef<HTMLDivElement>();
  const scrollToButtom = React.useCallback(() => {
    ref!.current!.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [ref]);

  React.useEffect(() => {
    scrollToButtom();
  }, [props.userMessageList]);
  return (
    <Box ref={ref}>
      {props.userMessageList?.map((userMessage: UserMessage, i) => (
        <Box
          key={i}
          sx={{
            mb: 2,
            textAlign: isMine(userMessage) ? "right" : "left",
          }}
        >
          <Box sx={{ display: "inline-flex" }}>
            <Message
              user={userMessage.user}
              message={userMessage.message}
              isMine={isMine(userMessage)}
              onIconClick={() => undefined}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
