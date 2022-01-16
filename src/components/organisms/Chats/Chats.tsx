import { Box } from "@mui/material";
import { Message } from "@/components/molecules";
import { Props, UserMessage } from "./types";
export const Chats = ({ ...props }: Props) => {
  const isMine = (userMessage: UserMessage): boolean => {
    return userMessage.user.uid === props.user?.uid;
  };
  return (
    <>
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
    </>
  );
};
