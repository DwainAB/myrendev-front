import styled from "styled-components";

export const StyledDemoBar = styled.div<{ demostep: number }>`
  &&& {
    animation-name: appearance;
    animation-duration: 500ms;
    animation-fill-mode: forwards;
    background-color: white;
    position: relative;
    transform: translateX(150%);
    flex-direction: column;
    align-items: center;
    width: 25vw;
    min-height: 100vh;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    z-index: 3;
  }
`;
