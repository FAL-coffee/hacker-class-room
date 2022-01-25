import { Props } from "./types";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import * as styled from "./styles";

export const Bar = ({ ...props }: Props) => {
  return (
    <styled.wrapper onClick={props.onClick} id="bar_wrapper">
      <Stack direction="row" spacing={1} alignItems="center" id="bar_stack">
        <Avatar alt={props.value} src={props.avatarImage} id="bar_avatar" />
        <styled.typographyWrapper id="bar_typography-wrapper">
          <styled.typography id="bar_typography">
            {props.value}
          </styled.typography>
        </styled.typographyWrapper>
        <div style={{ flex: "1 0 0" }} id="bar_justify-right" />
        <styled.arrow id="bar_arrow" arrowColor={props.arrowColor} />
      </Stack>
      <Divider id="bar_divider" />
    </styled.wrapper>
  );
};
