import styled, { keyframes } from "styled-components";

export const IconChartWrapper = styled("div")`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16em;
  height: 16em;
  transform: translate(-50%, -50%);
  color: #12395f;
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0.25em;
    height: 8.125em;
    margin: 0 0 0 -3.25em;
    transform: translate(-50%, -50%);
    background-color: currentColor;
    border-radius: 0.125em;
  }
  &:after {
    width: 8.125em;
    height: 0.25em;
    margin: 3.125em 0 0 -0.125em;
  }
`;

const Item = styled("i")`
  position: absolute;
  bottom: 4.75em;
  left: 9em;
  box-sizing: border-box;
  display: block;
  width: 1.875em;
  height: 0;
  background-color: #f69d88;
  box-shadow: inset 0 0 0 0.25em currentColor;
`;

export const FirstItem = styled(Item)`
  animation: chart1 0.999s infinite linear;
`;

export const SecondItem = styled(Item)`
  background-color: #ffdea3;
  animation: chart2 0.999s 0.333s infinite linear;
`;

export const LastItem = styled(Item)`
  background-color: #85c996;
  animation: chart3 0.999s 0.666s infinite linear;
`;
