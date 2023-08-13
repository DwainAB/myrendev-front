import styled from "styled-components";

export const StyledCustomerReviews = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #053771;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .customerReviewsContainer {
    justify-content: center;
    background-color: white;
    width: 80%;
    height: 90%;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-weight: 400;
    h1 {
      font-size: 32px;
      max-width: 394px;
      text-align: center;
      font-weight: 500;
    }
    h3,
    h2 {
      align-self: flex-start;
      width: 92.5%;
      margin-left: 4%;
      font-weight: 500;
    }
    h2 {
      font-size: 24px;
    }
    .pointsColumn {
      width: 100%;
      align-self: flex-start !important;
      align-items: flex-start !important;
      margin-left: 4%;
      font-size: 24px;
      .pointsRow {
        width: 100%;
        span {
          width: 70%;
        }
        .pointsButtonsRow {
          width: 15%;
          text-align: center;
          .pointsButtonContainer {
            display: flex;
            flex-direction: column;
            width: 100px;
            border: 1px solid black;
            border-radius: 30px;
            padding-top: 16px;
            padding-bottom: 16px;
            svg {
              font-size: 16px;
            }
          }
        }
      }
    }
    form {
      align-self: flex-start;
      display: flex;
      flex-direction: column;
      margin-left: 4%;
      width: 92%;
      textarea {
        font-family: "Montserrat";
        font-size: 16px;
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 173px;
        width: 100%;
        border-radius: 10px;
        outline: none;
        border: 1px solid black;
        white-space: pre-wrap;
        margin-bottom: 20px;
      }
      button {
        height: 50px;
        border: none;
        border-radius: 10px;
        color: white;
        background-color: black;
        font-size: 24px;
        text-align: center;
        transition: all 250ms;
        &:hover {
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.8);
          transition: all 250ms;
        }
      }
    }
  }
`;
