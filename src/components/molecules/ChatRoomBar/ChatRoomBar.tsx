import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

import { Bar, Tag } from "@/components/atoms";
import { Props } from "./types";

export const ChatRoomBar = ({ ...props }: Props) => {
  return (
    <Paper sx={{ p: 2 }} elevation={3}>
      <Bar
        value={props.chatRoom.name}
        avatarImage={props.chatRoom.iconURL}
        arrowColor="#f48fb1"
        onClick={() => props.onClick(props.chatRoom.id)}
      />
      <Box>
        <Typography variant="subtitle2">
          owner： {props.chatRoom.owner.displayName}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
          <Typography variant="subtitle2">tags：</Typography>
          <Box>
            {props.chatRoom.tags.map((tag) => (
              <span key={tag.id} style={{ padding: 1 }}>
                <Tag {...tag} onClick={(id: string) => props.onTagClick(id)} />
              </span>
            ))}
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
};
