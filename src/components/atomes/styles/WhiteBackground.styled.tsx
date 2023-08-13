import styled from "styled-components";

export const StyledWhiteBackground = styled.div`
  animation: opacityAnimation;
  animation-duration: 250ms;
  animation-fill-mode: forwards;
  position: absolute;
  left: 25%;
  height: 100vh;
  min-width: 100vw;

  background-color: rgba(255, 255, 255, 0.1);
  z-index: 1;
`;
