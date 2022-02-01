import * as React from "react";
import Container from "@mui/material/Container";
import { Props } from "./types";
import * as styled from "./styles";

export const Profile = ({ ...props }: Props) => {
  return (
    <Container>
      <styled.userInformationArea>
        {props.userInformationArea}
      </styled.userInformationArea>
      <styled.listTabArea>{props.listTabArea}</styled.listTabArea>
    </Container>
  );
};
