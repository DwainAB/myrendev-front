import styled from "styled-components";
import bgImg from "../../../assets/bg-carousel.png";

export const StyledHero = styled.div`
  background-image: url(${bgImg});
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  min-width: 75vw;
  max-width: 75vw;
  height: 100vh;

  h3 {
    margin: 0;
    margin-top: 10vh;
    margin-left: 7.5vw;
    color: white;
    font-size: 40px;
    font-weight: 700;
    letter-spacing: 1px;
    width: 580px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 430px) {
    display: none;
  }
`;
