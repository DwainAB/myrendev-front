import styled from "styled-components";

export const StyledNavigationBar = styled.div<{ activepage: number }>`
  animation-name: navbarTranslateX;
  animation-duration: 250ms;
  animation-fill-mode: forwards;
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 3;
  background-color: rgba(255, 255, 255, 0.7);
  .navigationContainer {
    width: 80vw;
    height: 100%;
    background-color: #053771;
    color: white;
    .navHeader {
      height: 30%;
      width: 100%;
      .row {
        align-items: normal;

        .userInfos {
          margin-top: 15%;
          min-width: 100%;

          img {
            height: 75px;
            width: 75px;
          }
        }
        svg {
          position: absolute;
          top: 2.5%;
          left: 70%;
        }
      }
    }
    ul {
      width: 90%;
      height: 60%;
      font-size: 16px;
      font-weight: 300;

      div {
        width: 92.5%;
        height: 50px;
        align-items: center;
        justify-content: flex-start;
        margin-left: 15px;
        margin-bottom: 20px;
        border-radius: 10px;
        text-align: left;
        background-color: #053771;
        li {
          width: 100%;
          text-align: left;
          &:hover {
            cursor: pointer;
          }
          .navSectionRow {
            padding-left: 20px;
            svg {
              margin-right: 15px;
              width: 10%;
            }
            span {
              width: 90%;
              padding-right: 15px;
            }
          }
        }
      }

      div:nth-child(${(props) => props.activepage}) {
        div {
          background-color: white;
          color: #053771;
          svg {
            path {
              fill: #053771;
            }
          }
          li {
            .navSectionRow {
              background-color: white;
              color: #053771;

              svg {
                path {
                  fill: #053771;
                }
              }
            }
          }
        }
      }
    }

    .navFooter {
      width: 92.5%;
      margin-left: 20px;
      height: 10%;
      div:nth-child(1) {
        background-color: white;
        margin-bottom: 20px;
      }
      div:nth-child(2) {
        svg {
          margin-right: 15px;
          height: 18px;
          width: 18px;
        }
        span {
          font-size: 14px;
          font-weight: 300;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }

  @media (min-width: 720px) {
    animation: none;
    position: sticky;
    width: 20vw;
    .navigationContainer {
      width: 100%;
      .navHeader {
        .row {
          align-items: normal;

          .userInfos {
            margin-top: 15%;
            min-width: 100%;

            img {
              height: 75px;
              width: 75px;
            }
          }
          svg {
            visibility: hidden;
          }
        }
      }
    }
  }
`;
