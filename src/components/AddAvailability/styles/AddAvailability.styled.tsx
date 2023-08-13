import styled from "styled-components";

export const StyledAddAvailability = styled.div`
  position: absolute;
  height: 100vh !important;
  width: 100vw !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.3);
  button {
    &:hover {
      cursor: pointer !important;
    }
  }
  .container {
    animation-name: mobileDetailsTranslateY;
    animation-duration: 250ms;
    animation-fill-mode: forwards;
    position: relative;
    width: 90% !important;
    height: 90% !important;
    align-items: center;
    color: black;
    gap: 20px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: white;
    svg:nth-child(1) {
      margin-top: 20px;
      position: relative;
      left: 40%;
    }
    div.selectors {
      position: relative;
      width: 80%;
      margin-top: 20px;
      margin-left: 10px;
      padding: 5px;
      font-size: 14px;
      font-weight: 400;
      input {
        width: 100%;
        margin-top: 5px;
        margin-bottom: 10px;
        height: 30px;
        padding: 5px;
      }
      label {
        font-weight: 600;
        font-size: 14px;
      }
      &:hover {
        cursor: pointer;
      }

      .typeSelector {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: left;
        margin-bottom: 20px;
        margin-top: 5px;
        border: 1px solid black;
        border-radius: 7px;
        padding: 5px;
        width: 100%;
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

      .hourSelector {
        position: relative;
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
    .rowButtons {
      margin-top: 20px;
      gap: 10px;
      button {
        height: 30px;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 500;
        &:hover {
          cursor: pointer;
        }
      }
      button:nth-child(1) {
        border: none;
        background-color: black;
        color: white;
      }
      button:nth-child(2) {
        border: 1px solid black;
        background-color: white;
        color: black;
      }
    }
  }

  @media (min-width: 720px) {
    height: 100vh !important;
    width: 80vw !important;
    h3 {
      font-size: 30px;
    }
    .container {
      position: relative;
      width: 80% !important;
      height: 90% !important;
      right: 5%;
      align-items: center;
      color: black;
      gap: 20px;
      border: 1px solid black;
      border-radius: 10px;
      background-color: white;
      gap: 20px;
      svg:nth-child(1) {
        margin-top: 20px;
        position: relative;
        left: 45%;
        &:hover {
          cursor: pointer;
        }
      }
      .filtersEditorContainer {
        height: 100%;
        width: 100% !important;
        .filtersInputsColumn {
          width: 50% !important;
          align-self: flex-start !important;
          margin-left: 5%;
          label {
            font-size: 20px !important;
          }
          .filtersForm {
            width: 100% !important;
            align-self: flex-start !important;
            button {
              width: 300px;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
        .filtersColorsColumn {
          width: 20% !important;
          align-self: flex-start !important;
          margin-top: 10%;
          span {
            font-size: 24px !important;
          }
          .colors {
            width: 100px;
            flex-wrap: wrap;
            gap: 10px;
            .filterColor {
              min-height: 45px;
              min-width: 45px;
              border-radius: 30px;
            }
            .selectedFilterColor {
              border: 5px solid cyan;
            }
          }
        }
      }
      .inputsColumn {
        height: 60%;
        width: 92.5%;
        justify-content: center;
        margin-left: 15px;
        form {
          position: relative;
          width: 92.5%;
          display: flex;
          flex-wrap: wrap;
          margin-left: 15px;
          .form-group {
            width: 33.3%;
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
            label {
              margin-bottom: 5px;
            }
            input {
              height: 40px;
              font-size: 16px;
              width: 90%;
            }
          }
          button {
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            top: 125%;
            height: 30px;
            border-radius: 5px;
            border: none;
            background-color: black;
            color: white;
            font-size: 18px;
            font-weight: 500;
            padding: 20px;
            width: 30%;
            text-align: center;
          }
        }
      }

      div.selectors {
        position: relative;
        width: 80%;
        margin-top: 20px;
        margin-left: 10px;
        padding: 5px;
        font-size: 14px;
        font-weight: 400;
        input {
          height: 50px;
          font-size: 16px;
        }
        label {
          font-weight: 600;
          font-size: 16px;
        }
        &:hover {
          cursor: pointer;
        }

        .typeSelector {
          justify-content: center;
          height: 50px;
          font-size: 16px;
          .selected {
            display: flex;
            align-items: center;
            .color {
              height: 15px;
              width: 15px;
              border-radius: 30px;
              margin-right: 5px;
              margin-left: 5px;
            }
            span {
              width: 90%;
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

        .hourSelector {
          justify-content: center;
          height: 50px;
          font-size: 16px;
          .selected {
            display: flex;
            align-items: center;
            .color {
              background-color: black;
              height: 15px;
              width: 15px;
              border-radius: 30px;
              margin-right: 5px;
              margin-left: 5px;
            }
            span {
              width: 90%;
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
      .rowButtons {
        gap: 10px;
        button {
          font-size: 18px;
          font-weight: 500;
          padding: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
`;
