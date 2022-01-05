import styled from "styled-components";
import { Props } from "./types";

const mVectorMap: Map<string, string> = new Map([
  ["top", "top"],
  ["right", "left"],
  ["bottom", "bottom"],
  ["left", "right"],
]);

const bTopMap: Map<string, string> = new Map([
  ["top", "-26px"],
  ["right", "50%"],
  ["bottom", "100%"],
  ["left", "50%"],
]);

const bLeftMap: Map<string, string> = new Map([
  ["top", "50%"],
  ["right", "100%"],
  ["bottom", "50%"],
  ["left", "-13px"],
]);

const bmTMap: Map<string, string> = new Map([
  ["top", "0px"],
  ["right", "-13px"],
  ["bottom", "0px"],
  ["left", "-13px"],
]);

const bmLMap: Map<string, string> = new Map([
  ["top", "-13px"],
  ["right", "0px"],
  ["bottom", "-13px"],
  ["left", "-13px"],
]);

const arrowVectorMap: Map<string, string> = new Map([
  ["top", "bottom"],
  ["right", "left"],
  ["bottom", "top"],
  ["left", "right"],
]);

export const container = styled.div.attrs(({ ...props }: Props) => ({
  tail: props.tail || "top",
  color: props.color || "pink",
}))`
  position: relative;
  display: inline-block;
  margin-${(props) => mVectorMap.get(props.tail)}: ${(props) =>
  (props.tail === "right" || props.tail === "left") && "-"}13px;
  padding: 0.7rem 1rem;
  min-width: 60px;
  max-width: 20rem;
  border-radius: 5px;
  color: #0d0015;
  font-size: 16px;
  background: ${(props) => props.color};
  &:before {
    content: "";
    position: absolute;
    top: ${(props) => bTopMap.get(props.tail)};
    left: ${(props) => bLeftMap.get(props.tail)};
    ${(props) =>
      props.tail != "top" && `margin-top: ${bmTMap.get(props.tail)};`}
    margin-left: ${(props) => bmLMap.get(props.tail)};
    border: 13px solid transparent;
    border-${(props) => arrowVectorMap.get(props.tail)}-color: ${(props) =>
  props.color};
  }
`;
