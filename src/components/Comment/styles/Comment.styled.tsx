import styled from "styled-components";

export const StyledComment = styled.div`
  height: 120px;
  width: 92.5%;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  .columnContainer {
    width: 100%;
    gap: 0;
    height: 100%;
    justify-content: center;
    .rowInfos {
      height: 40%;
      width: 90%;
      margin-left: 10px;
      img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
      }
      .nameColumn {
        align-items: flex-start;
        gap: 0;
        span {
          font-size: 16px;
          font-weight: 500;
          color: black;
        }
        .rowStars {
          gap: 5px;
          svg {
            font-size: 15px;
          }
        }
      }
      span {
        font-size: 12px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.5);
      }
    }
    p {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.8);
      width: 90%;
      margin-left: 10px;
      visibility: visible !important;
    }
  }

  @media (min-width: 768px) {
    .rowInfos {
      align-self: center !important;
    }
  }
`;
