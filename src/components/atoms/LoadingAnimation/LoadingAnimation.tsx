import * as styled from "./styles";
export const LoadingAnimation = () => {
  return (
    <>
      <styled.IconChartWrapper>
        <h4>認証中...</h4>
        <styled.FirstItem />
        <styled.SecondItem />
        <styled.LastItem />
      </styled.IconChartWrapper>
    </>
  );
};
