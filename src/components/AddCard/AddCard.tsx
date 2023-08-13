import React, { useEffect, useState } from "react";
import { FaPlus, FaChevronDown } from "react-icons/fa";
import { StyledAddCard1, StyledAddCard2 } from "./styles/AddCard.styled";
import { StyledFlexRow } from "../styles/FlexRow.styled";
import examples from "../DemoBar/examples.json";
import {
  StyledBlackButton,
  StyledWhiteButton,
} from "../AddAvailability/atomes/BlackWhiteButton/styles/BlackWhiteButton.styled";
import { useAddScheduleContext } from "../../helpers/AddScheduleContext";

function AddCard() {
  const [addSchedule, setAddSchedule] = useAddScheduleContext();
  const [isTypeSelecting, setIsTypeSelecting] = useState<boolean>(false);
  const [isHourSelecting, setIsHourSelecting] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<String>(
    "Type de disponibilité"
  );
  const [selectedHour, setSelectedHour] = useState<String>("Créneau horaire");

  const selectedTypeMap = examples.objets.find(
    (objet) => objet.titre === selectedType
  );

  return (
    <StyledAddCard1>
      <div onClick={() => setAddSchedule({ isDisplayed: true })}>
        <FaPlus />
      </div>
      <span>Ajouter une disponibilité</span>
    </StyledAddCard1>
  );
}

export default AddCard;
