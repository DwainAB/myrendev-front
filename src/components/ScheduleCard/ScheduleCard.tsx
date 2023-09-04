import React, { useRef, useState } from "react";
import { StyledScheduleCard } from "./styles/ScheduleCard.styled";
import { StyledFlexRow } from "../styles/FlexRow.styled";
import { Flex } from "../styles/Flex.styled";
import { User, Appointment, Filter, Client } from "../../types";
import { useScheduleDetailsContext } from "../../helpers/ScheduleDetailsContext";
import EllipsisPopup from "../atomes/EllipsisPopup/EllipsisPopup";
import { StyledEllipsisPopup } from "../Atomes/EllipsisPopup/styles/EllipsisPopup.styled.tsx";

function ScheduleCard({ data }: { data: Appointment }) {
  const [isDetailsDisplayed, setIsDetailsDisplayed] =
    useScheduleDetailsContext();

  const [isEllipsisDisplayed, setIsEllipsisDisplayed] =
    useState<boolean>(false);

  const handleScheduleDetails = () => {
    if (data.color == "") {
      return;
    }
    setIsDetailsDisplayed((prev) => ({
      ...prev,
      isDisplayed: true,
      details: data,
    }));
  };

  const ellipsisRefs = useRef<{
    [key: string]: React.Ref<SVGSVGElement> | null;
  }>({});

  const ellipsisPopupRef = useRef<HTMLDivElement | null>(null);

  const handleEllipsisClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const target = event.target as SVGSVGElement;
    const buttonRect = target.getBoundingClientRect();

    // Positionnement de l'ellipsisPopup juste en dessous du bouton ellipsis
    if (ellipsisPopupRef.current) {
      ellipsisPopupRef.current.style.left = `${buttonRect.left}px !important`;
      ellipsisPopupRef.current.style.top = `${buttonRect.bottom}px !important`;
    }

    isEllipsisDisplayed
      ? setIsEllipsisDisplayed(false)
      : setIsEllipsisDisplayed(true);
  };

  
  return (
    <StyledScheduleCard
      style={{ backgroundColor: data.clientName ? data.color : null}}
      onClick={handleScheduleDetails}
    >
      {isEllipsisDisplayed ? (
        // Le popup qui s'affiche après le click sur le svg ellipsis

        <StyledEllipsisPopup
          className="ellipsisPopup"
          ref={ellipsisPopupRef}
          onClick={() => setIsEllipsisDisplayed(false)}
        >
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
          <StyledFlexRow
            onClick={() =>
              setIsDetailsDisplayed((prev) => ({
                ...prev,
                isDisplayed: true,
                details: data,
                isModifying: true,
              }))
            }
          >
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
      ) : null}

      {/* le composant card qui s'affiche */}

      <Flex>
        <StyledFlexRow>
          <h3>{data.title}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="4"
            viewBox="0 0 16 4"
            fill="none"
            ref={ellipsisRefs.current[data.title + data.hours + data.date]}
            onClick={handleEllipsisClick}
          >
            <path
              d="M12 2C12 1.46957 12.2107 0.96086 12.5858 0.585787C12.9609 0.210714 13.4696 0 14 0C14.5304 0 15.0391 0.210714 15.4142 0.585787C15.7893 0.96086 16 1.46957 16 2C16 2.53043 15.7893 3.03914 15.4142 3.41421C15.0391 3.78929 14.5304 4 14 4C13.4696 4 12.9609 3.78929 12.5858 3.41421C12.2107 3.03914 12 2.53043 12 2ZM6 2C6 1.46957 6.21071 0.96086 6.58579 0.585787C6.96086 0.210714 7.46957 0 8 0C8.53043 0 9.03914 0.210714 9.41421 0.585787C9.78929 0.96086 10 1.46957 10 2C10 2.53043 9.78929 3.03914 9.41421 3.41421C9.03914 3.78929 8.53043 4 8 4C7.46957 4 6.96086 3.78929 6.58579 3.41421C6.21071 3.03914 6 2.53043 6 2ZM0 2C0 1.46957 0.210714 0.96086 0.585786 0.585787C0.960859 0.210714 1.46957 0 2 0C2.53043 0 3.03914 0.210714 3.41421 0.585787C3.78929 0.96086 4 1.46957 4 2C4 2.53043 3.78929 3.03914 3.41421 3.41421C3.03914 3.78929 2.53043 4 2 4C1.46957 4 0.960859 3.78929 0.585786 3.41421C0.210714 3.03914 0 2.53043 0 2Z"
              fill={data.clientName ? "white" : "black"}
            />
          </svg>
        </StyledFlexRow>
        <StyledFlexRow>
          <span className="hour">{data.hours}</span>
          {data.clientName ? (
            <span className="customerName">{data.clientName}</span>
          ) : null}
        </StyledFlexRow>
      </Flex>
    </StyledScheduleCard>
  );
}

export default ScheduleCard;
