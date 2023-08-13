import styled from "styled-components";

export const StyledMobileDetailsCard = styled.div`
  position: absolute;
  z-index: 5;
  height: 100vh !important;
  width: 100vw !important;
  background-color: rgba(0, 0, 0, 0.3);
  .mobileDetailsContainer {
    animation-name: mobileDetailsTranslateY;
    animation-duration: 250ms;
    animation-fill-mode: forwards;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    position: relative;
    left: 10%;
    top: 7.5%;
    width: 80% !important;
    height: 80% !important;
    align-items: normal;
    background-color: white;
    padding-top: 20px;
    > svg:nth-child(1) {
      margin-left: 20px;
    }
    > button:nth-child(2) {
      position: absolute;
      top: 5.5%;
      left: 35%;
      width: 200px;
      border: none;
      border-radius: 5px;
      background-color: black;
      color: white;
      height: 30px;
      &:hover {
        cursor: pointer;
      }
    }
    h4 {
      margin-top: 20px;
      margin-left: 20px;
      margin-bottom: 50px;
      font-size: 32px;
      font-weight: 600;
      width: 250px;
    }
    .detailsAndIntervenantsRow {
      .detailsColumn {
        align-items: flex-start;
        input {
          width: 150px;
        }
        button {
          margin-left: 20px;
          background-color: black;
          color: white;
          border: none;
          border-radius: 5px;
          height: 30px;
          width: 200px;
          &:hover {
            cursor: pointer;
          }
        }
        .detailRow {
          svg {
            margin-left: 20px;
            margin-right: 10px;
          }
          span {
            font-size: 14px;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.6);
            width: 200px;
          }
        }
        .detailRowIntervenants {
          position: relative;
          svg {
            margin-left: 20px;
            margin-right: 10px;
          }
          div {
            flex-wrap: wrap;
            gap: 10px;
            span {
              font-size: 12px;
              font-weight: 600;
              color: rgba(0, 0, 0, 0.6);
              width: 200px;
              padding: 5px;
              padding-left: 10px;
              border-radius: 30px;
              color: white;
              background-color: #5e60ce;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
        div:nth-child(6) {
          align-self: center;
        }
        .reviewColumn {
          align-items: flex-start;
          margin-left: 20px;
          span:nth-child(1) {
            font-size: 18px;
            font-weight: 500;
          }
          span:nth-child(3) {
            font-size: 18px;
            font-weight: 500;
          }
          .starsRow {
            svg {
              margin-right: 5px;
            }
          }
          p {
            color: rgba(0, 0, 0, 0.6);
            width: 90%;
          }
        }
      }
      .intervenantSelector {
        align-self: flex-start;
        position: relative;
        font-size: 14px;
        right: 30%;
        bottom: 1.5%;
        display: flex;
        flex-direction: column;
        align-items: left;
        margin-bottom: 20px;
        border: 1px solid black;
        border-radius: 7px;
        padding: 5px;
        width: 300px;
        .selected {
          display: flex;
          align-items: center;
          .color {
            height: 10px;
            width: 10px;
            border-radius: 30px;
            margin-right: 5px;
          }
          span {
            width: 90%;
          }
          &:hover {
            cursor: pointer;
          }
        }
        ul {
          position: absolute;
          padding: 5px;
          top: 125%;
          left: 0;
          width: 100%;
          background-color: white;
          z-index: 3;
          border: 1px solid black;
          border-radius: 7px;
          li {
            padding-top: 5px;
            padding-bottom: 5px;
            display: flex;
            align-items: center;
            .color {
              border-radius: 30px;
              margin-right: 10px;
              height: 10px;
              width: 10px;
            }
          }
        }
      }
    }
  }

  @media (min-width: 720px) {
    position: absolute;
    height: 60vh;
    width: 50vw;
    .mobileDetailsContainer {
      left: 25%;
      top: 7.5%;
      width: 50% !important;
      height: 80% !important;
      align-items: normal;
      margin-top: 20px;
      background-color: white;
      > svg:nth-child(1) {
        margin-left: 0px;
        position: absolute;
        left: 90%;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;
