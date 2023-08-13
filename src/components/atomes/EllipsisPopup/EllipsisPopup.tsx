import React from "react";
import { StyledEllipsisPopup } from "./styles/EllipsisPopup.styled";
import { StyledFlexRow } from "../../styles/FlexRow.styled";

function EllipsisPopup() {
  return (
    <>
      <StyledEllipsisPopup className="ellipsisPopup">
        <StyledFlexRow>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M5 0C7.75 0 10 2.25 10 5C10 7.75 7.75 10 5 10C2.25 10 0 7.75 0 5C0 2.25 2.25 0 5 0ZM5 1C4.05 1 3.2 1.3 2.55 1.85L8.15 7.45C8.65 6.75 9 5.9 9 5C9 2.8 7.2 1 5 1ZM7.45 8.15L1.85 2.55C1.3 3.2 1 4.05 1 5C1 7.2 2.8 9 5 9C5.95 9 6.8 8.7 7.45 8.15Z"
              fill="black"
            />
          </svg>
          <span>Annuler l'évènement</span>
        </StyledFlexRow>
        <StyledFlexRow>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M9.83752 2.24552C10.0542 2.02888 10.0542 1.66782 9.83752 1.4623L8.5377 0.162477C8.33218 -0.0541591 7.97112 -0.0541591 7.75448 0.162477L6.7324 1.179L8.81544 3.26205M0 7.91696V10H2.08304L8.22664 3.85085L6.14359 1.76781L0 7.91696Z"
              fill="black"
            />
          </svg>
          <span>Modifier l'évènement</span>
        </StyledFlexRow>
      </StyledEllipsisPopup>
    </>
  );
}

export default EllipsisPopup;
