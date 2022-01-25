import { Bar } from "@/components/atoms";
import { Props } from "./types";

export const UserBar = ({ ...props }: Props) => {
  return (
    <Bar
      value={props.user.displayName}
      avatarImage={props.user.photoURL}
      arrowColor="#90caf9"
      onClick={() => props.onClick(props.user.uid)}
    />
  );
};
