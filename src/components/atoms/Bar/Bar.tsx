import { Props } from "./types";
import * as styled from "./styles";
export const Bar = ({ ...props }: Props) => {
  return <styled.container {...props}>{props.value}</styled.container>;
};
