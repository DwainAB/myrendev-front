import React from "react";
import { StyledExitButton } from "./styles/ExitButton.styled";
import { Flex } from "../../styles/Flex.styled";
import { useScheduleDetailsContext } from "../../../helpers/ScheduleDetailsContext";

function ExitButton() {
  const [isDetailsDisplayed, setIsDetailsDisplayed] =
    useScheduleDetailsContext();
  return (
    <svg
      onClick={() =>
        setIsDetailsDisplayed({
          isDisplayed: false,
          details: null,
          isModifying: false,
        })
      }
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="51"
      viewBox="0 0 50 51"
      fill="none"
    >
      <ellipse cx="25" cy="25.4171" rx="25" ry="24.6762" fill="#D9D9D9" />
      <line
        y1="-0.5"
        x2="24.8105"
        y2="-0.5"
        transform="matrix(0.647698 -0.761897 0.770151 0.637862 17 34.4496)"
        stroke="black"
      />
      <line
        y1="-0.5"
        x2="24.8105"
        y2="-0.5"
        transform="matrix(0.647698 0.761897 -0.770151 0.637862 17 15.5466)"
        stroke="black"
      />
    </svg>
  );
}

export default ExitButton;
