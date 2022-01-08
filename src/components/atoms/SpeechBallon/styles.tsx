import styled from "styled-components";
import { Props } from "./types";

interface VectorMap {
  marginsVector: Props["tail"];
  before_top: string;
  before_left: string;
  before_marginTop: string;
  before_marginLeft: string;
  before_bordersVector: Props["tail"];
}

const vectorMap: Map<string, VectorMap> = new Map([
  [
    "top",
    {
      marginsVector: "top",
      before_top: "-26px",
      before_left: "50%",
      before_marginTop: "0px",
      before_marginLeft: "-13px",
      before_bordersVector: "bottom",
    },
  ],
  [
    "right",
    {
      marginsVector: "left",
      // before_top: "50%",
      before_top: "21px",
      before_left: "100%",
      before_marginTop: "-13px",
      before_marginLeft: "0px",
      before_bordersVector: "left",
    },
  ],
  [
    "bottom",
    {
      marginsVector: "bottom",
      before_top: "100%",
      before_left: "50%",
      before_marginTop: "0px",
      before_marginLeft: "-13px",
      before_bordersVector: "top",
    },
  ],
  [
    "left",
    {
      marginsVector: "right",
      // before_top: "50%",
      before_top: "21px",
      before_left: "-13px",
      before_marginTop: "-13px",
      before_marginLeft: "-13px",
      before_bordersVector: "right",
    },
  ],
]);

export const container = styled.div.attrs(({ ...props }: Props) => ({
  tail: props.tail || "top",
  textColor: props.textColor || "black",
  color: props.color || "pink",
}))`
  text-align:left;
  position: relative;
  overflow-wrap: break-word;
  display: inline-block;
  margin-${(props) => vectorMap.get(props.tail)?.marginsVector}: ${(props) =>
  (props.tail === "right" || props.tail === "left") && "-"}13px;
  padding: 0.7rem 1rem;
  min-width: 60px;
  max-width: 40rem;
  border-radius: 5px;
  color: ${(props) => props.textColor};
  font-size: 16px;
  background: ${(props) => props.color};
  &:before {
    content: "";
    position: absolute;
    top: ${(props) => vectorMap.get(props.tail)?.before_top};
    left: ${(props) => vectorMap.get(props.tail)?.before_left};
    ${(props) =>
      props.tail != "top" &&
      `margin-top: ${vectorMap.get(props.tail)?.before_marginTop};`}
    margin-left: ${(props) => vectorMap.get(props.tail)?.before_marginLeft};
    border: 13px solid transparent;
    border-${(props) =>
      vectorMap.get(props.tail)?.before_bordersVector}-color: ${(props) =>
  props.color};
  }
`;
