import styled from "styled-components";

export const StyledSliders = styled.div<{ activepage: number }>`
  position: fixed;
  top: 95%;
  bottom: 7.5vh;
  align-self: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 75vw;

  div {
    min-width: 7.5vw;
    min-height: 2vh;
    border: 1px solid white;
    background-color: none;
    border-radius: 30px;
    opacity: 0.5;
    &:hover {
      cursor: pointer;
    }
  }

  div:nth-child(${({ activepage }) => activepage}) {
    background-color: white;
  }
`;
