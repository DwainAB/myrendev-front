import React from "react";
import { StyledEmailNotification } from "../styles/AuthBar.styled";

function EmailNotification() {
  return (
    <>
      <StyledEmailNotification>
        <p>
          Un mail de récupération a bien été envoyé à l'adresse
          example@gmail.com
        </p>
        <button>Revenir à l'accueil</button>
      </StyledEmailNotification>
    </>
  );
}

export default EmailNotification;
