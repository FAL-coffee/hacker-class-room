import Container from "@mui/material/Container";

import { Props } from "./types";
import * as styled from "./styles";

export const ChatRoom = ({ ...props }: Props) => {
  return (
    <Container>
      <styled.ChatDisplayArea>{props.ChatDisplayArea}</styled.ChatDisplayArea>
      <styled.MessagePostForm>{props.MessagePostForm}</styled.MessagePostForm>
    </Container>
  );
};
