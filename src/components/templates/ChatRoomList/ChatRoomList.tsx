import Container from "@mui/material/Container";

import { Props } from "./types";
import * as styled from "./styles";

export const ChatRoomList = ({ ...props }: Props) => {
  return (
    <>
      <Container>
        <styled.ChatRoomListDisplayArea>
          {props.ChatRoomListDisplayArea}
        </styled.ChatRoomListDisplayArea>
      </Container>
    </>
  );
};
