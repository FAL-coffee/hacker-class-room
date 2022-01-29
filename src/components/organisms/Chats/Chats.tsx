import { createRef, useCallback, useEffect } from "react";
import { Box } from "@mui/material";
import { Message } from "@/components/molecules";
import { Props } from "./types";
import { IMessage } from "@types";
export const Chats = ({ ...props }: Props) => {
  const isMine = (message: IMessage): boolean => {
    if (!message.user) return false;
    else return message.user.uid === props.user?.uid;
  };

  const ref = createRef<HTMLDivElement>();
  const scrollToButtom = useCallback(() => {
    ref!.current!.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [ref]);

  const handleUserClick = (uid: string) => {
    if (!!props.onUserClick) props.onUserClick(uid);
  };

  useEffect(() => {
    if (!!props.messages) scrollToButtom();
  }, [props.messages, scrollToButtom]);
  return (
    <Box ref={ref}>
      {props.messages?.map((message: IMessage, i) => (
        <Box
          key={i}
          sx={{
            mb: 2,
            textAlign: isMine(message) ? "right" : "left",
          }}
        >
          <Box sx={{ display: "inline-flex" }}>
            <Message
              user={message.user}
              message={message}
              isMine={isMine(message)}
              onUserClick={handleUserClick}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
