import styled from "styled-components";

export const StyledEllipsisPopup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  max-height: 75px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
  position: absolute;
  /* top: 35%;
  left: 84.5%; */
  color: black;
  font-size: 12px;
  div {
    min-width: 100%;
    height: 50%;
    svg {
      margin: 0 !important;
      margin-left: 10px !important;
      width: 10%;
    }
    span {
      width: 90%;
      max-width: 150px;
      margin-right: 10px;
    }
    &:hover {
      cursor: pointer;
    }
  }
`;
