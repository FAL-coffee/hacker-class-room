import { Stack } from "@mui/material";

import { UserBar } from "@/components/molecules";
import { IUser } from "@types";
import { Props } from "./types";

export const UserBarList = ({ ...props }: Props) => {
  return (
    <Stack direction="column" spacing={3}>
      {props.users.map((user: IUser, i: number) => (
        <span key={i} id={`user_bar_list-user_bar_${user.uid}`}>
          <UserBar user={user} onClick={props.onUserClick} />
        </span>
      ))}
    </Stack>
  );
};
