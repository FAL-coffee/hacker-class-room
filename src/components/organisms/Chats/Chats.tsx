import { Box } from "@mui/material";
import { Message } from "@/components/molecules";
import { Props, UserMessage } from "./types";
export const Chats = ({ ...props }: Props) => {
  return (
    <>
      {props.userMessageList?.map((userMessage: UserMessage, i) => (
        <Box
          key={i}
          sx={{
            mb: 2,
            textAlign:
              userMessage.user.uid === props.user?.uid ? "right" : "left",
          }}
        >
          <Box sx={{ display: "inline-flex" }}>
            <Message
              user={userMessage.user}
              message={userMessage.message}
              isMine={userMessage.user.uid === props.user?.uid}
              onIconClick={() => undefined}
            />
          </Box>
        </Box>
      ))}
    </>
  );
};
