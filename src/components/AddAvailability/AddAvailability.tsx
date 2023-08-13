import React, { useEffect, useState } from "react";
import moment from "moment";
import { Flex } from "../styles/Flex.styled";
import ExitButton from "../Atomes/ExitButton/ExitButton";
import StraightBar from "../Atomes/StraightBar/StraightBar";
import { FaChevronDown } from "react-icons/fa";
import { StyledAddAvailability } from "./styles/AddAvailability.styled";
import { User, Appointment, Filter, Client } from "../../types";
import { StyledFlexRow } from "../styles/FlexRow.styled";
import { useAddScheduleContext } from "../../helpers/AddScheduleContext";
import useGetFilters from "./hooks/useGetFilters";
import { useAuthDataContext } from "../../helpers/AuthDataContext";
import { useCustomerContext } from "../../helpers/CustomerContext";
import usePostAppointment from "./hooks/usePostAppointment";
import usePostInvitationAppointment from "./hooks/usePostInvitationAppointment";
import useGetAppointments from "../../pages/hooks/useGetAppointments";


function AddAvailability() {
  const date = moment();
  const [customerState, setCustomerState] = useCustomerContext();
  const [authData, setAuthData] = useAuthDataContext();
  const [addSchedule, setAddSchedule] = useAddScheduleContext();
  const [isTypeSelecting, setIsTypeSelecting] = useState<boolean>(false);
  const [isHourSelecting, setIsHourSelecting] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<Appointment>({
    id: null,
    phoneEnterprise: authData.loginData.phoneEnterprise,
    companyName: authData.loginData.companyName,
    title: "Type de disponibilité",
    duration: 0,
    color: "#FFF",
    hours: null,
    date: null,
    intervenants: null,
    clientName: null,
    address: null,
    note: null,
    punctuality: null,
    friendliness: null,
    interventionQuality: null,
    comment: null,
  });
  const [selectedHour, setSelectedHour] = useState<String>("Créneau horaire");
  const [selectedDays, setSelectedDays] = useState<number>(1);
  const [replenishmentPeriod, setReplenishmentPeriod] = useState<number>(0);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [newAvailableHours, setNewAvailableHours] = useState<string[]>([]);

console.log(authData.appointments);

  
  const { getFilters } = useGetFilters();
  const { postAppointment } = usePostAppointment();
  const { postInvitationAppointment } = usePostInvitationAppointment();

  var appointmentsArray = [] as Appointment[];
  var availableHours = [] as string[];

  const addFinalAppointments = async () => {
    const manageAppointments = async () => {
      appointmentsArray = [];
      if (replenishmentPeriod > 0) {
        const replanishementType = {
          ...selectedType,
          date: moment(selectedType.date)
            .add(replenishmentPeriod * 7, "days")
            .toDate(),
        };
        if (selectedDays == 1) {
          appointmentsArray.push(replanishementType);
        }
        for (let i = 1; i < selectedDays; i++) {
          if (i == 1) {
            appointmentsArray.push(replanishementType);
          }
          const nextDate = moment(replanishementType.date)
            .add(i, "days")
            .toDate();
          const updatedType = { ...replanishementType, date: nextDate };
          appointmentsArray.push(updatedType);
        }
      } else {
        if (selectedDays == 1) {
          appointmentsArray.push(selectedType);
        }
        for (let i = 1; i < selectedDays; i++) {
          if (i == 1) {
            appointmentsArray.push(selectedType);
          }
          const nextDate = moment(selectedType.date).add(i, "days").toDate();
          const updatedType = { ...selectedType, date: nextDate };
          appointmentsArray.push(updatedType);
        }
      }
    };
    await manageAppointments();
    postAppointment(appointmentsArray);

    console.log(appointmentsArray);
  };  

  const addFinalAppointmentsWithInvitation = async () => {
    const manageAppointments = async () => {
      appointmentsArray = [];
      if (replenishmentPeriod > 0) {
        const replanishementType = {
          ...selectedType,
          date: moment(selectedType.date)
            .add(replenishmentPeriod * 7, "days")
            .toDate(),
        };
        if (selectedDays == 1) {
          appointmentsArray.push(replanishementType);
        }
        for (let i = 1; i < selectedDays; i++) {
          if (i == 1) {
            appointmentsArray.push(replanishementType);
          }
          const nextDate = moment(replanishementType.date)
            .add(i, "days")
            .toDate();
          const updatedType = { ...replanishementType, date: nextDate };
          appointmentsArray.push(updatedType);
        }
      } else {
        if (selectedDays == 1) {
          appointmentsArray.push(selectedType);
        }
        for (let i = 1; i < selectedDays; i++) {
          if (i == 1) {
            appointmentsArray.push(selectedType);
          }
          const nextDate = moment(selectedType.date).add(i, "days").toDate();
          const updatedType = { ...selectedType, date: nextDate };
          appointmentsArray.push(updatedType);
        }
      }
    };
    await manageAppointments();
    postInvitationAppointment(appointmentsArray, customerState.clientDetails);

    console.log(appointmentsArray);
  };

  useEffect(() => {
    const getFiltersData = async () => {
      setFilters(await getFilters(setAuthData));
    };

    getFiltersData();
  }, [authData.loginData == null]);

  useEffect(() => {
    setNewAvailableHours(availableHours);
  }, [availableHours.length]);

  const getAvailableHours = (date: Date, title: string, duration: number) => {
    console.log(authData.appointments);
    const occupiedHours = authData.appointments
      .filter(
        (appointment) =>
          appointment.date === date && appointment.title === title
      )
      .map((appointment) => appointment.hours);
    console.log(occupiedHours);

    const startTime = moment("07:00", "HH:mm");
    const endTime = moment("19:00", "HH:mm");
    const availableHours = [];

    while (startTime.isSameOrBefore(endTime)) {
      const endTimeOfSlot = startTime.clone().add(duration, "hours");
      const slot = `${startTime.format("HH:mm")} - ${endTimeOfSlot.format(
        "HH:mm"
      )}`;

      if (!occupiedHours.some((hours) => isTimeRangeOverlap(slot, hours))) {
        availableHours.push(slot);
      }

      startTime.add(1, "hour");
    }

    setNewAvailableHours(availableHours);
  };

  // Fonction pour vérifier si deux plages horaires se chevauchent
  const isTimeRangeOverlap = (range1: string, range2: string) => {
    const [start1, end1] = range1.split("-");
    const [start2, end2] = range2.split("-");

    return (
      (moment(start1, "HH:mm").isSameOrBefore(moment(end2, "HH:mm")) &&
        moment(end1, "HH:mm").isSameOrAfter(moment(start2, "HH:mm"))) ||
      (moment(start2, "HH:mm").isSameOrBefore(moment(end1, "HH:mm")) &&
        moment(end2, "HH:mm").isSameOrAfter(moment(start1, "HH:mm")))
    );
  };

  return (
    <>
      {addSchedule.isDisplayed ? (
        <>
          <StyledAddAvailability>
            <Flex className="container">
              <svg
                onClick={() => setAddSchedule({ isDisplayed: false })}
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
              <h3>
                {" "}
                {customerState.clientDetails != null
                  ? "Ajout de rendez-vous"
                  : "Ajout de disponibilité"}
              </h3>
              <StraightBar />
              <Flex className="inputsColumn">
                <div className="selectors">
                  <label htmlFor="">Type de rendez-vous:</label>
                  <div className="typeSelector">
                    <div
                      onClick={() =>
                        isTypeSelecting
                          ? setIsTypeSelecting(false)
                          : setIsTypeSelecting(true)
                      }
                      className="selected"
                    >
                      <div
                        className="color"
                        style={{
                          backgroundColor: selectedType.color,
                        }}
                      ></div>
                      <span>{selectedType.title}</span>
                      <FaChevronDown />
                    </div>
                    {isTypeSelecting ? (
                      <ul>
                        {filters.map((filter, index) => {
                          
                          return (
                            <li key={index}>
                              <div
                                className="color"
                                style={{
                                  backgroundColor: filter.color,
                                }}
                              ></div>
                              <span
                                onClick={() => {
                                  setSelectedType((prev) => ({
                                    ...prev,
                                    title: filter.title,
                                    color: filter.color,
                                    duration: filter.duration,
                                  }));
                                  setIsTypeSelecting(false);
                                }}
                              >
                                {filter.title}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </div>
                  <label htmlFor="typeTitle">Titre du rendez-vous</label>
                  <input
                    type="text"
                    name="typeTitle"
                    id=""
                    value={selectedType.title != null ? selectedType.title : ""}
                    onChange={(e) =>
                      setSelectedType((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />



                  {/*------------------------Partie qui s'occupe de la durée du RDV--------------------------*/}
                  <label htmlFor="typeDuration">Durée du rendez-vous</label>
                  <input
                    type="number"
                    name="typeDuration"
                    id=""
                    value={selectedType.duration != null ? selectedType.duration : "0"}
                    onChange={(e) => {
                      const newDuration = parseInt(e.target.value);
                      setSelectedType((prev) => ({
                        ...prev,
                        duration: newDuration,
                      }));
                      // Mettre à jour les heures disponibles avec la nouvelle durée
                      getAvailableHours(selectedType.date, selectedType.title, newDuration);
                    }}
                  />

                  <input
                    type="date"
                    name=""
                    id=""
                    onChange={(e) => {
                      const selectedDate = moment(e.currentTarget.value, "YYYY-MM-DD").toDate();
                      setSelectedType((prev) => ({
                        ...prev,
                        date: selectedDate,
                      }));
                      getAvailableHours(selectedDate, selectedType.title, selectedType.duration); // Mettez à jour avec la nouvelle durée
                    }}
                  />




                  {/* -------------------------Partie qui gère l'heure du RDV ----------------------------*/}
                  <div className="hourSelector">
                    <div
                      onClick={() =>
                        isHourSelecting
                          ? setIsHourSelecting(false)
                          : setIsHourSelecting(true)
                      }
                      className="selected"
                    >
                      <div
                        className="color"
                        style={{
                          backgroundColor: "#000000",
                        }}
                      ></div>
                      <span>{selectedHour}</span>
                      <FaChevronDown />
                    </div>
                    {isHourSelecting ? (
                      <ul>
                        {newAvailableHours.map((hour, index) => {
                          const startMoment = moment(hour, "HH:mm");
                          const endMoment = startMoment.clone().add(selectedType.duration, "minutes");

                          const isHourReserved = authData.appointments.some((appointment) => {
                            const appointmentStart = moment(appointment.hours.split(" - ")[0], "HH:mm");
                            const appointmentEnd = moment(appointment.hours.split(" - ")[1], "HH:mm");
                          
                            // Vérifier si le nouvel horaire chevauche avec l'horaire existant
                            const overlaps =
                              (startMoment.isBetween(appointmentStart, appointmentEnd, undefined, "[]")) ||
                              (endMoment.isBetween(appointmentStart, appointmentEnd, undefined, "[]")) ||
                              (appointmentStart.isBetween(startMoment, endMoment, undefined, "[]")) ||
                              (appointmentEnd.isBetween(startMoment, endMoment, undefined, "[]"));
                          
                              const isSameType = appointment.title === selectedType.title;

                              return (
                                moment(appointment.date).isSame(selectedType.date, "day") &&
                                overlaps &&
                                isSameType
                              );
                            
                          });

                          if (isHourReserved) {
                            return null;
                          }

                          return (
                            <li key={index}>
                              <div className="color"></div>
                              <span
                                onClick={(e) => {
                                  const textContent = e.currentTarget.textContent;
                                  if (textContent) {
                                    setSelectedHour(textContent);
                                    setIsHourSelecting(false);
                                    setSelectedType((prev) => {
                                      const [startTime, endTime] = textContent.split(" - ");

                                      // Convertir les heures de texte en objets Moment
                                      const startMoment = moment(startTime, "HH:mm");
                                      const endMoment = moment(endTime, "HH:mm");

                                      // Obtenir la date existante du rendez-vous
                                      const existingDate = moment(prev.date);

                                      // Mettre à jour l'heure de la date existante
                                      existingDate
                                        .hour(startMoment.hour())
                                        .minute(startMoment.minute());

                                      return {
                                        ...prev,
                                        hours: textContent,
                                        date: existingDate.toDate(), // Convertir en objet Date si nécessaire
                                      };
                                    });
                                  }
                                }}
                              >
                                {hour}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </div>


                  <label htmlFor="replenishmentPeriod">
                    Délai de réapprovisionnement (en semaines)
                  </label>
                  <input
                    type="number"
                    name="replenishmentPeriod"
                    id=""
                    value={replenishmentPeriod}
                    onChange={(e) => {
                      setReplenishmentPeriod(parseInt(e.currentTarget.value));
                    }}
                  />
                  <label htmlFor="daysInARow">Jours consécutifs</label>
                  <input
                    type="number"
                    name="daysInARow"
                    id=""
                    value={selectedDays}
                    onChange={(e) => {
                      setSelectedDays(parseInt(e.currentTarget.value));
                    }}
                  />
                </div>
              </Flex>
              <StyledFlexRow className="rowButtons">
                {customerState.clientDetails != null ? (
                  <button
                    onClick={() => {
                      addFinalAppointmentsWithInvitation();
                    }}
                  >
                    Envoyer l'invitation au client
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      addFinalAppointments();
                      console.log(appointmentsArray);
                    }}
                  >
                    Ajouter le créneau
                  </button>
                )}
                <button onClick={() => setAddSchedule({ isDisplayed: false })}>
                  Annuler l'ajout
                </button>
              </StyledFlexRow>
            </Flex>
          </StyledAddAvailability>
        </>
      ) : null}
    </>
  );
}

export default AddAvailability;
