import styled from "styled-components";

export const StyledFiltersEditor = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  .createFilterButton {
    align-self: center !important;
    width: 92.5%;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    height: 65px;
    &:hover {
      cursor: pointer;
    }
    .add {
      margin-left: 10px;
      margin-right: 10px;
      border: 1px solid black;
      border-radius: 30px;
      height: 50px;
      width: 50px;
      justify-content: center;
      align-self: center !important;
    }
  }
  .filterElement {
    color: white;
    width: 92.5%;
    align-items: flex-start !important;
    justify-content: center;
    height: 50px;
    border-radius: 30px;
    span {
      margin-left: 20px;
    }
  }
`;
