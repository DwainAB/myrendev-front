import styled from "styled-components";

export const StyledContactCard = styled.div<{ isopened: boolean }>`
  width: 92.5%;
  height: ${(props) => (props.isopened ? "200px" : "70px")};
  .containerColumn {
    align-items: flex-start;
    justify-content: ${(props) => (props.isopened ? "flex-start" : "center")};
    width: 100%;
    height: 100%;
    background-color: ${(props) => (props.isopened ? "#4EA8DE" : "#5E60CE")};
    border-radius: 20px;
    color: white;
    gap: 0;
    .contactNameRow {
      margin-left: 20px;
      height: 50%;
      align-items: center;
      img {
        height: 50px;
        width: 50px;
        margin-right: 10px;
      }
      .contactNameColumn {
        height: 100%;
        align-items: flex-start;
        justify-content: center;
        gap: 0;
        span {
          font-size: 14px;
          font-weight: 600;
        }
        .linkRow {
          margin-top: 10px;
          align-items: center;
          svg {
            margin-right: 5px;
          }
          span {
            color: rgba(255, 255, 255, 0.7);
          }
        }
      }
    }
    .buttonsRow {
      display: ${(props) => (props.isopened ? "flex" : "none")};
      flex-wrap: wrap;
      margin-left: 20px;
      width: 100%;
      align-items: center;
      justify-content: center;
      gap: 5%;
      div {
        justify-content: center;
        border-radius: 30px;
        background-color: white;
        color: #5e60ce;
        font-size: 14px;
        font-weight: 500;
        width: 40%;
        height: 30px;
        &:hover {
          cursor: pointer;
        }
      }
      div:nth-child(3) {
        margin-top: 20px;
      }
    }
  }
`;
