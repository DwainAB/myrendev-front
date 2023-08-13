import React, { useState } from "react";
import { StyledContactCard } from "./styles/ContactCard.styled";
import { Flex } from "../styles/Flex.styled";
import { StyledFlexRow } from "../styles/FlexRow.styled";
import { FaLink } from "react-icons/fa";
import { User, Appointment, Filter, Client } from "../../types";
import { useAddScheduleContext } from "../../helpers/AddScheduleContext";
import { useCustomerContext } from "../../helpers/CustomerContext";

function ContactCard({ data }: { data: Client }) {
  const [customerState, setCustomerState] = useCustomerContext();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [addSchedule, setAddSchedule] = useAddScheduleContext();

  return (
    <>
      <StyledContactCard
        isopened={isOpened}
        onClick={() => (isOpened ? setIsOpened(false) : setIsOpened(true))}
      >
        <Flex className="containerColumn">
          <StyledFlexRow className="contactNameRow">
            <img src="src/assets/customer.png" alt="" />
            <Flex className="contactNameColumn">
              <span>
                {data.clientFirstName} {data.clientLastName}
              </span>
              <StyledFlexRow className="linkRow">
                <FaLink />
                <span>vers le dernier rendez-vous</span>
              </StyledFlexRow>
            </Flex>
          </StyledFlexRow>
          {isOpened ? (
            <StyledFlexRow className="buttonsRow">
              <Flex>Téléphoner</Flex>
              <Flex>Envoyer un mail</Flex>
              <Flex
                onClick={() => (
                  setAddSchedule({ isDisplayed: true }),
                  setCustomerState((prev) => ({ ...prev, clientDetails: data }))
                )}
              >
                Envoyer une invitation
              </Flex>
            </StyledFlexRow>
          ) : null}
        </Flex>
      </StyledContactCard>
    </>
  );
}

export default ContactCard;
