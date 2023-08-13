import styled from "styled-components";

export const StyledPerformancesChart = styled.div<{ percentage: number }>`
  .columnContainer {
    height: 100%;
    h2 {
      font-size: 32px;
      font-weight: 500;
      width: 80%;
      text-align: center;
    }
    .globalNoteColumn {
      margin-bottom: 20px;
      span {
        font-size: 36px;
        font-weight: 500;
      }
      div {
        gap: 10px;
        svg {
          font-size: 33px;
        }
      }
    }
    .chartsColumn {
      width: 90%;
      gap: 0;
      .chartContainer {
        align-items: flex-start;
        position: relative;
        .emptyBar {
          width: 100%;
          height: 10px;
          background-color: rgba(0, 0, 0, 0.3);
        }
        .fullfilledBar {
          width: 60%;
          height: 10px;
          background-color: black;
          transform: translateY(-300%);
        }
      }
    }
  }
`;
