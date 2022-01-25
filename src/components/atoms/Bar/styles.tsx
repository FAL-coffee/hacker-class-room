import { styled as MStyled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import { Props } from "./types";

export const wrapper = styled("div")`
  width: 100%;
  padding: 5px;
  padding-right: 12px;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

export const typographyWrapper = styled("div")`
  width: calc(100% - 32px);
  overflow: hidden;
`;

export const typography = MStyled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.text.secondary,
  wordWrap: "break-word",
  textOverflow: "ellipsis",
}));

export const arrow = styled.div.attrs(({ ...props }: Props) => ({
  arrowColor: props.arrowColor || "pink",
}))`
  border-top: solid 4px ${(props) => props.arrowColor};
  border-right: solid 4px ${(props) => props.arrowColor};
  min-width: 12px;
  min-height: 12px;
  transform: rotate(45deg);
`;
