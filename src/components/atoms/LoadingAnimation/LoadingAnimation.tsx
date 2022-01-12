import * as styled from "./styles";
import "./stylestyle.css";
export const LoadingAnimation = () => {
  return (
    <>
      <styled.IconChartWrapper>
        <styled.FirstItem />
        <styled.SecondItem />
        <styled.LastItem />
      </styled.IconChartWrapper>
      <style jsx>{`
        @keyframes chart1 {
          0% {
            height: 0;
          }
          10% {
            height: 5.625em;
          }
          70% {
            width: 1.875em;
            transform: translateX(-4.375em);
          }
          99% {
            width: 0;
            height: 5.625em;
            transform: translateX(-4.375em);
          }
          99.1% {
            height: 0;
            transform: translateX(0em);
          }
          100% {
            height: 0;
          }
        }

        @keyframes chart2 {
          0% {
            height: 0;
          }
          10% {
            height: 2.375em;
          }
          70% {
            width: 1.875em;
            transform: translateX(-4.375em);
          }
          99% {
            width: 0;
            height: 2.375em;
            transform: translateX(-4.375em);
          }
          99.1% {
            height: 0;
            transform: translateX(0em);
          }
          100% {
            height: 0;
          }
        }

        @keyframes chart3 {
          0% {
            height: 0;
          }
          10% {
            height: 3.5625em;
          }
          70% {
            width: 1.875em;
            transform: translateX(-4.375em);
          }
          99% {
            width: 0;
            height: 3.5625em;
            transform: translateX(-4.375em);
          }
          99.1% {
            height: 0;
            transform: translateX(0em);
          }
          100% {
            height: 0;
          }
        }
      `}</style>
    </>
  );
};
