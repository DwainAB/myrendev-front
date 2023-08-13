import styled from "styled-components";

export const StyledDesktopPage = styled.div`
  .rowContainerCustomer {
    width: 100vw !important;
  }

  .rowContainer {
    width: 80vw;
    .sideBarRight {
      align-self: last baseline;
      width: 25vw;
      border-left: 1px solid black;
      min-height: 100vh;
      max-height: 100vh;
      overflow: scroll;
    }
    .agenda {
      width: 55vw;
    }
    .desktopColumnContainer {
      width: 55vw;
      height: 100vh;
      .searchBar {
        width: 92.5%;
        height: 40px;
        border-radius: 30px;
        border: 1px solid rgba(0, 0, 0, 0.5);
        svg {
          width: 7.5%;
          opacity: 0.8;
        }
        input {
          border: none;
          width: 90%;
          outline: none;
        }
      }
      .createContactButton {
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
          align-self: center;
        }
      }
      div:nth-child(1) {
        align-self: flex-start;
        h1 {
          margin-left: 10%;
        }
        p {
          visibility: hidden;
        }
        .userIcon {
          visibility: hidden;
        }
      }
    }
  }
`;
