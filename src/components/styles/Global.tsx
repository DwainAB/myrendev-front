import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* @font-face {
    font-family: 'Montserrat';
    src: url('../../fonts/Montserrat/Montserrat-VariableFont_wght.ttf');
  } */

  @keyframes appearance {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(150%);
      }
    }

    @keyframes opacityAnimation {
    0% {
      background-color: rgba(255, 255, 255, 0);
      backdrop-filter: blur(0px);
    }
    100% {
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(5px);
    }
  }

  @keyframes navbarTranslateX {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0%);
    }
  }

  @keyframes mobileDetailsTranslateY {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  



    

  * {
    box-sizing: border-box;
  }

  html {
    margin: 0;
    padding: 0;
  }

  body {
    display: flex;
    flex-direction: row;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.15em;
    margin: 0;
    padding: 0;
    /* overflow: hidden; */
  }

  

  
`;

export default GlobalStyles;
