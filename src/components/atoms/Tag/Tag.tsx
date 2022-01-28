import Chip from "@mui/material/Chip";
import { Props } from "./types";

export const Tag = ({ size = "small", color = "default", ...props }: Props) => {
  return (
    <Chip
      onClick={() =>
        typeof props.onClick === "function" &&
        typeof props.id === "string" &&
        props.onClick(props.id)
      }
      variant="outlined"
      size={size}
      label={props.value}
      color={color}
    ></Chip>
  );
};
