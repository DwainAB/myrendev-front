import styled from "styled-components";
import userIcon from "../../../../src/assets/profile.png";
import customerIcon from "../../../../src/assets/customer.png";

export const StyledMobileHeader = styled.div`
  width: 100vw;

  div {
    align-items: flex-start;
    width: 100%;
    div {
      justify-content: space-between;
      align-items: center;
      .userIcon {
        width: 50px;
        height: 50px;
        max-width: 50px;
        max-height: 50px;
        background-image: url(${userIcon});
        background-size: cover;
        background-position: center;
        margin-right: 15px;
        margin-top: 15px;
      }
      svg {
        margin-top: 15px;
        margin-left: 15px;
      }
    }
    p {
      margin-left: 15px;
      font-size: 14px;
      font-weight: 400;
    }
    h1 {
      margin-left: 15px;
      font-size: 24px;
      font-weight: 500;
      margin-top: -10px;
      width: 80%;
    }
  }

  @media (min-width: 720px) {
    width: 22.5vw;
    svg {
      visibility: hidden;
    }
  }
`;
