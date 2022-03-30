import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { FollowButtonProps } from "./types";

export const FollowButton = ({ ...props }: FollowButtonProps) => {
  return (
    <>
      {props.following ? (
        <Button
          id="unFollow_button"
          fullWidth
          variant="contained"
          endIcon={<ArrowDropUpIcon />}
          onClick={props.onClick}
        >
          Un Follow
        </Button>
      ) : (
        <Button
          id="follow_button"
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
