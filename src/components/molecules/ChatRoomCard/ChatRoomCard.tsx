import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Stack from "@mui/material/Stack";
import { Props } from "./types";

import { Tag } from "@/components/atoms";

export const ChatRoomCard = ({ ...props }: Props) => {
  const handleUserClick = () => {
    props.onUserClick(props.chatRoom.owner.uid);
  };
  const handleOpenClick = () => {
    props.onOpenClick(props.chatRoom.id);
  };
  const handleTagClick = (genreId: string, id: string) => {
    props.onTagClick(genreId, id);
  };
  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: "flex", alignItems: "flex-end" }}
        >
          <Avatar
            id="chat_room_card-chat_room_icon_avatar"
            alt={props.chatRoom.name}
            src={props.chatRoom.iconURL}
            sx={{ width: 36, height: 36 }}
          />
          <Typography
            variant="h2"
            component="div"
            sx={{ fontSize: 36 }}
            id="chat_room_card-chat_room_name"
          >
            {props.chatRoom.name}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ ml: 2 }}>
          <Typography variant="h3" sx={{ fontSize: 24 }}>
            owner:
          </Typography>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: "flex", alignItems: "flex-end" }}
            >
              <Avatar
                id="chat_room_card-chat_room_owner_avatar"
                alt={props.chatRoom.owner.displayName}
                src={props.chatRoom.owner.photoURL}
                onClick={handleUserClick}
                sx={{ width: 28, height: 28 }}
                style={{ cursor: "pointer" }}
              />
              <Typography
                variant="h4"
                sx={{ fontSize: 20 }}
                id="chat_room_card-chat_room_owner"
              >
                {props.chatRoom.owner.displayName}
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <Typography
          variant="body2"
          sx={{ ml: 5 }}
          color="text.secondary"
          id="chat_room_card-chat_room_descriotion"
        >
          {props.chatRoom.description}
        </Typography>
        <CardActions>
          <Stack direction="row" sx={{ ml: 5 }} spacing={1}>
            <Typography variant="subtitle2">tags：</Typography>
            <Box id="chat_room_card-tags_area">
              {props.chatRoom.tags.map((tag) => (
                <span
                  key={tag.id}
                  style={{ padding: 1 }}
                  id={`chat_room_card-tag_${tag.id}`}
                >
                  <Tag
                    {...tag}
                    onClick={(id: string) => handleTagClick(tag.genreId, id)}
                  />
                </span>
              ))}
            </Box>
          </Stack>
        </CardActions>
      </CardContent>
      <Box sx={{ textAlign: "right", mb: 2, mr: 2 }}>
        <Button
          id="chat_room_card-open_button"
          endIcon={<ArrowForwardIcon />}
          onClick={handleOpenClick}
        >
          チャットに参加する
        </Button>
      </Box>
    </Card>
  );
};
