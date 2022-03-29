import IconButton from "@mui/material/IconButton";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { DirectMessageIconButtonProps } from "./types";

export const DirectMessageIconButton = ({
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
