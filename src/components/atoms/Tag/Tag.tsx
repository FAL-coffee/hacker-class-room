import Chip from "@mui/material/Chip";
import { Props } from "./types";

export const Tag = ({ size = "small", color = "default", ...props }: Props) => {
  return (
    <Chip
      onClick={() =>
        typeof props.onClick === "function" &&
        typeof props.id === "number" &&
        props.onClick(props.id)
      }
      variant="outlined"
      size={size}
      label={props.name}
      color={color}
    ></Chip>
  );
};
