import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import "moment/locale/fr";
import { StyledCustomerAppointmentConfirmation } from "./styles/CustomerAppointmentConfirmation.styled";
import { Flex } from "../../../../components/styles/Flex.styled";
import { StyledFlexRow } from "../../../../components/styles/FlexRow.styled";
import StraightBar from "../../../../components/Atomes/StraightBar/StraightBar";
import { User, Appointment, Filter, Client } from "../../../../types";
import { useScheduleDetailsContext } from "../../../../helpers/ScheduleDetailsContext";
import { useCustomerContext } from "../../../../helpers/CustomerContext";
import useConfirmAppointment from "./hooks/useConfirmAppointment";

function CustomerAppointmentConfirmation() {
  const [customerState, setCustomerState] = useCustomerContext();
  const { confirmAppointment } = useConfirmAppointment();
  const [detailsState, setDetailsState] = useScheduleDetailsContext();
  var scheduleDetails = detailsState.details;

  const [modifiedAppointment, setModifiedAppointment] = useState<Appointment>({
    id: scheduleDetails.id,
    phoneEnterprise: detailsState.details.phoneEnterprise,
    companyName: detailsState.details.companyName,
    title: scheduleDetails.title,
    duration: scheduleDetails.duration,
    color: scheduleDetails.color,
    hours: scheduleDetails.hours,
    date: scheduleDetails.date,
    intervenants: scheduleDetails.intervenants,
    clientName:
      customerState.clientDetails.clientFirstName +
      " " +
      customerState.clientDetails.clientLastName,
    address: customerState.clientDetails.clientAddress,
    note: null,
    punctuality: null,
    friendliness: null,
    interventionQuality: null,
    comment: null,
  });

  function formatDate(date: Date) {
    moment.locale("fr");
    return moment(date).format("dddd D MMMM YYYY");
  }

  return (
    <StyledCustomerAppointmentConfirmation>
      <Flex className="mobileDetailsContainer">
        <StyledFlexRow>
          <svg
            onClick={() =>
              setDetailsState((prevState) => ({
                ...prevState,
                isDisplayed: false,
              }))
            }
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="35"
            viewBox="0 0 36 35"
            fill="none"
          >
            <ellipse
              cx="17.7297"
              cy="17.5"
              rx="17.7297"
              ry="17.5"
              fill="#D9D9D9"
            />
            <line
              y1="-0.5"
              x2="17.5953"
              y2="-0.5"
              transform="matrix(0.647698 -0.761897 0.770151 0.637862 12.0562 23.9058)"
              stroke="black"
            />
            <line
              y1="-0.5"
              x2="17.5953"
              y2="-0.5"
              transform="matrix(0.647698 0.761897 -0.770151 0.637862 12.0562 10.5)"
              stroke="black"
            />
          </svg>
          <h3>Voulez-vous prendre le rendez-vous suivant ?</h3>
        </StyledFlexRow>
        <StraightBar />
        <Flex>
          <p>
            Le <strong>{formatDate(modifiedAppointment.date)}</strong>, de{" "}
            <strong>{modifiedAppointment.hours}</strong>, avec l'entreprise{" "}
            <strong>{modifiedAppointment.companyName}</strong> ?
          </p>
        </Flex>
        <StraightBar />
        <Flex>
          <StyledFlexRow>
            <button onClick={() => confirmAppointment(modifiedAppointment)}>
              Confirmer le rendez-vous
            </button>
            <button
              onClick={() =>
                setDetailsState((prevState) => ({
                  ...prevState,
                  isDisplayed: false,
                }))
              }
            >
              Annuler
            </button>
          </StyledFlexRow>
        </Flex>
      </Flex>
    </StyledCustomerAppointmentConfirmation>
  );
}

export default CustomerAppointmentConfirmation;
