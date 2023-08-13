import styled from "styled-components";

export const StyledAuthBar = styled.div`
  display: flex;
  background-color: #053771;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 25vw;
  max-width: 25vw;
  min-height: 100vh;
  max-height: 100vh;
  color: white;
  box-shadow: 5px 5px 30px 5px rgba(0, 0, 0, 0.5);
  z-index: 3;
  > div:nth-child(1) {
    height: 100%;
    width: 100%;
    h1 {
      font-size: 36px;
      font-weight: 800;
      margin: 0;

      letter-spacing: 1px;
      color: white;
      opacity: 1;
    }

    p {
      font-size: 16px;
      font-weight: 100;
      text-align: center;
      letter-spacing: 1px;
      opacity: 0.8;
      width: 250px;
      margin-bottom: 5vh;
    }

    form {
      display: flex;
      flex-direction: column;
      width: 20vw;
      label {
        font-weight: 200;
        margin-bottom: 5px;
      }
      span {
        font-size: 14px;
        font-weight: 600;
        color: red;
        margin-bottom: 5px;
      }
      input {
        height: 35px;
        border-radius: 7px;
        border: none;
        padding-left: 10px;
        margin-bottom: 20px;
      }
      button {
        opacity: 0.8;
        font-size: 18px;
        letter-spacing: 0.5px;
        height: 50px;
        border-radius: 7px;
        border: 1px solid white;
        margin-top: 20px;
        color: white;
        background-color: #053771;
        transition: all 150ms;
        &:hover {
          cursor: pointer;
          opacity: 1;
          transition: all 250ms;
        }
      }
      .authNavigation {
        margin-top: 0;
        color: rgba(255, 255, 255, 0.8);
        text-align: left;
        font-size: 12px;
        transition: all 250ms;
        &:hover {
          cursor: pointer;
          color: rgba(255, 255, 255, 1);
          transition: all 250ms;
        }
      }
    }
    .authNavigation {
      color: rgba(255, 255, 255, 0.8);
      text-align: center;
      font-size: 12px;
      transition: all 250ms;
      &:hover {
        cursor: pointer;
        color: rgba(255, 255, 255, 1);
        transition: all 250ms;
      }
    }
  }

  @media (max-width: 450px) {
    min-width: 100vw;
    min-height: 100vh;
    form {
      width: 100%;
      height: 100%;
    }
  }
`;

export const StyledEmailNotification = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    opacity: 1;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  }
  button {
    opacity: 0.8;
    font-size: 18px;
    letter-spacing: 0.5px;
    height: 50px;
    border-radius: 7px;
    border: 1px solid white;
    color: white;
    background-color: #053771;
    transition: all 150ms;
    &:hover {
      cursor: pointer;
      opacity: 1;
      transition: all 250ms;
    }
  }
`;
