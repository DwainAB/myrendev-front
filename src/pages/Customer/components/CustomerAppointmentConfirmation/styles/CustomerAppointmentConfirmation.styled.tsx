import styled from "styled-components";

export const StyledCustomerAppointmentConfirmation = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  z-index: 5;
  height: 100vh !important;
  width: 100vw !important;
  background-color: rgba(0, 0, 0, 0.3);
  .mobileDetailsContainer {
    position: relative;
    background-color: white;
    left: 25%;
    top: 7.5%;
    width: 50% !important;
    height: 80% !important;
    align-items: normal;
    margin-top: 20px;
    animation-name: mobileDetailsTranslateY;
    animation-duration: 250ms;
    animation-fill-mode: forwards;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    div:nth-child(1) {
      height: 25%;
      width: 100%;
      justify-content: center;
      h3 {
        font-size: 32px;
        width: 350px;
        text-align: center;
      }
      svg {
        position: relative;
        right: 20%;
      }
    }
    div:nth-child(2) {
      width: 95%;
      align-self: center;
    }
    div:nth-child(3) {
      width: 100%;
      justify-content: center;
      height: 35%;
      p {
        align-self: center;
        text-align: center;
        font-size: 24px;
        width: 60%;
      }
    }
    div:nth-child(4) {
      width: 95%;
      align-self: center;
    }
    div:nth-child(5) {
      width: 100%;
      height: 25%;
      div {
        gap: 20px;
        button {
          font-size: 16px;
          height: 50px;
          width: 235px;
        }
        button:nth-child(1) {
          background-color: black;
          color: white;
          border: none;
          border-radius: 7px;
        }
        button:nth-child(2) {
          background-color: white;
          color: black;
          border: 1px solid black;
          border-radius: 7px;
        }
      }
    }
  }

  @media (min-width: 720px) {
    .mobileDetailsContainer {
      width: 100%;
      height: 100%;
      align-items: normal;
      margin-top: 20px;
      background-color: white;
    }
  }
`;
