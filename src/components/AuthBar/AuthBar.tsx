import { useState } from "react";
import { Flex } from "../styles/Flex.styled";
import {
  StyledAuthBar,
  StyledEmailNotification,
} from "./styles/AuthBar.styled";
import { useCarousel } from "../../helpers/CarouselContext";
import ColoredButton from "../Atomes/ColoredButton";
import { useAuthPage } from "../../helpers/AuthPageContext";
import Login from "./atomes/Login";
import Register from "./atomes/Register";
import EmailRecover from "./atomes/EmailRecover";
import EmailNotification from "./atomes/EmailNotification";
import PasswordChange from "./atomes/PasswordChange";

function AuthBar() {
  const [carouselState, setCarouselState] = useCarousel();
  const [authPage, setAuthPage] = useAuthPage();

  return (
    <>
      <StyledAuthBar
        onMouseEnter={() => (
          setCarouselState({ page: 4 }),
          setAuthPage((prevAuthPage) => ({ ...prevAuthPage, styled: true }))
        )}
        onMouseLeave={() => (
          setCarouselState({ page: 1 }),
          setAuthPage((prevAuthPage) => ({ ...prevAuthPage, styled: false }))
        )}
      >
        <Flex>
          <h1>MyRendev</h1>
          <p>
            Gérer et surveiller l’agenda ainsi que les performances de votre
            entreprise
          </p>
          {authPage.loginPage == 1 ? (
            <Login />
          ) : authPage.loginPage == 2 ? (
            <Register />
          ) : authPage.loginPage == 3 ? (
            <EmailRecover />
          ) : authPage.loginPage == 4 ? (
            <EmailNotification />
          ) : (
            <PasswordChange />
          )}
        </Flex>
      </StyledAuthBar>
    </>
  );
}

export default AuthBar;
