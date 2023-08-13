import styled from "styled-components";

export const StyledBlackButton = styled.div`
  display: flex;
  align-items: center;
  min-width: 60%;
  height: 30px;
  background-color: black;
  color: white;
  font-size: 12px;
  border-radius: 7px;
  margin-top: 20px;
  margin-right: 10px;
  padding-left: 5px;
  &:hover {
    cursor: pointer;
  }
`;

export const StyledWhiteButton = styled.div`
  display: flex;
  align-items: center;
  min-width: 60%;
  height: 30px;
  background-color: white;
  color: black;
  font-size: 12px;
  border: 1px solid black;
  border-radius: 7px;
  margin-top: 20px;
  padding-left: 5px;
  &:hover {
    cursor: pointer;
  }
`;
