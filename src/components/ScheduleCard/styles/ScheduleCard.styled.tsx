import styled from "styled-components";

export const StyledScheduleCard = styled.div<{ backgroundColorProp?: string }>`
  position: relative;
  height: 150px;
  width: 92.5%;
  border: ${(props) =>
    props.backgroundColorProp ? "none" : "1px solid black"};
  border-radius: 10px;
  color: ${(props) => (props.backgroundColorProp ? "white" : "black")};
  background-color: ${(props) =>
    props.backgroundColorProp ? props.backgroundColorProp : "white"};
  div {
    height: 150px;
    div:nth-child(1) {
      width: 100%;
      justify-content: space-between;

      h3 {
        font-size: 20px;
        font-weight: 400;
        margin-left: 15px;
      }
      svg {
        margin-right: 15px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    div:nth-child(2) {
      width: 100%;
      justify-content: space-between;
      .hour {
        margin-left: 15px;
        font-size: 14px;
        font-weight: 400;
        opacity: 0.8;
      }
      .customerName {
        margin-right: 15px;
        font-size: 14px;
        font-weight: 400;
        opacity: 0.8;
      }
    }
  }
`;
