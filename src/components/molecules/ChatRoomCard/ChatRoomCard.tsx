import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Props } from "./types";

export const ChatRoomCard = ({ ...props }: Props) => {
  return (
    <Card sx={{ background: "#e3f2fd" }}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {props.chatRoom.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.chatRoom.description}
        </Typography>
      </CardContent>
      <Box sx={{ textAlign: "right", mb: 2, mr: 2 }}>
        <Button
          endIcon={<ArrowForwardIcon />}
          onClick={() => props.onOpenClick(props.chatRoom.id)}
        >
          チャットに参加する
        </Button>
      </Box>
    </Card>
  );
};
