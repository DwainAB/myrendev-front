import styled from "styled-components";

export const StyledAddCard1 = styled.div`
  min-height: 150px;
  width: 92.5%;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  gap: 20px;
  div {
    height: 50px;
    width: 50px;
    border: 1px solid black;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
    img {
      width: 14px;
      height: 14px;
    }
  }
  span {
    font-size: 14px;
    font-weight: 300;
    text-align: center;
  }
`;

export const StyledAddCard2 = styled.div`
  min-height: 200px;
  max-height: 300px;
  width: 92.5%;
  border: 1px solid black;
  border-radius: 10px;
  color: black;
  gap: 20px;
  div.selectors {
    max-width: 60%;
    margin-top: 20px;
    margin-left: 10px;
    padding: 5px;
    font-size: 14px;
    font-weight: 400;

    &:hover {
      cursor: pointer;
    }
    .typeSelector {
      display: flex;
      flex-direction: column;
      align-items: left;
      margin-bottom: 20px;
      border: 1px solid black;
      border-radius: 7px;
      padding: 5px;
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
          width: 80%;
        }
      }
      ul {
        li {
          padding-top: 5px;
          padding-bottom: 5px;
          display: flex;
          align-items: center;
          .color {
            border-radius: 30px;
            margin-right: 5px;
            height: 10px;
            width: 10px;
          }
        }
      }
    }

    .hourSelector {
      display: flex;
      flex-direction: column;
      align-items: left;
      margin-bottom: 20px;
      border: 1px solid black;
      border-radius: 7px;
      padding: 5px;
      .selected {
        display: flex;
        align-items: center;
        .color {
          background-color: black;
          height: 10px;
          width: 10px;
          border-radius: 30px;
          margin-right: 5px;
        }
        span {
          width: 80%;
        }
      }
      ul {
        li {
          padding-top: 5px;
          padding-bottom: 5px;
          display: flex;
          align-items: center;
          .color {
            background-color: black;
            border-radius: 30px;
            margin-right: 5px;
            height: 10px;
            width: 10px;
          }
        }
      }
    }
  }
`;
