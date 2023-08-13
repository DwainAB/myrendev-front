import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import "moment/locale/fr";
import { StyledMobileDetailsCard } from "./styles/MobileDetailsCard.styled";
import { Flex } from "../styles/Flex.styled";
import ExitButton from "../Atomes/ExitButton/ExitButton";
import { StyledFlexRow } from "../styles/FlexRow.styled";
import StraightBar from "../Atomes/StraightBar/StraightBar";
import { User, Appointment, Filter, Client, Employee } from "../../types";
import { useScheduleDetailsContext } from "../../helpers/ScheduleDetailsContext";
import { useAuthDataContext } from "../../helpers/AuthDataContext";
import useEditAppointment from "./hooks/useEditAppointment";
import useGetEmployees from "../../pages/hooks/useGetEmployees";
import { FaChevronDown, FaStar } from "react-icons/fa";

function MobileDetailsCard() {
  const [detailsState, setDetailsState] = useScheduleDetailsContext();
  const [scheduleDetails, setScheduleDetails] = useState<Appointment>(
    detailsState.details
  );

  const { editAppointment } = useEditAppointment();
  const { getEmployees } = useGetEmployees();

  const [authData, setAuthData] = useAuthDataContext();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [intervenantsArray, setIntervenantsArray] = useState<string[]>([]);
  const [isIntervenantSelecting, setIsIntervenantSelecting] =
    useState<boolean>();

  const [modifiedAppointment, setModifiedAppointment] = useState<Appointment>({
    id: scheduleDetails.id,
    phoneEnterprise: authData.loginData.phoneEnterprise,
    companyName: authData.loginData.companyName,
    title: scheduleDetails.title,
    duration: scheduleDetails.duration,
    color: scheduleDetails.color,
    hours: scheduleDetails.hours,
    date: scheduleDetails.date,
    intervenants:
      intervenantsArray.length > 0
        ? intervenantsArray
        : scheduleDetails.intervenants,
    clientName: scheduleDetails.clientName,
    address: scheduleDetails.address,
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

  useEffect(() => {
    const fetchData = async () => {
      const employeesData = await getEmployees(setAuthData);
      setEmployees(employeesData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setModifiedAppointment({
      ...modifiedAppointment,
      intervenants: intervenantsArray,
    });
  }, [intervenantsArray]);

  return (
    <StyledMobileDetailsCard>
      {detailsState.isModifying && !detailsState.details.note ? (
        <Flex className="mobileDetailsContainer">
          <ExitButton />
          <h4>{scheduleDetails.title}</h4>
          <StyledFlexRow className="detailsAndIntervenantsRow">
            <Flex className="detailsColumn">
              <StyledFlexRow className="detailRow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="22"
                  viewBox="0 0 20 22"
                  fill="none"
                >
                  <path
                    d="M6.66667 10.0412H4.44444V12.2127H6.66667V10.0412ZM11.1111 10.0412H8.88889V12.2127H11.1111V10.0412ZM15.5556 10.0412H13.3333V12.2127H15.5556V10.0412ZM17.7778 2.44091H16.6667V0.269409H14.4444V2.44091H5.55556V0.269409H3.33333V2.44091H2.22222C0.988889 2.44091 0 3.41809 0 4.61241V19.8129C0 20.3889 0.234126 20.9412 0.650874 21.3484C1.06762 21.7557 1.63285 21.9844 2.22222 21.9844H17.7778C18.3671 21.9844 18.9324 21.7557 19.3491 21.3484C19.7659 20.9412 20 20.3889 20 19.8129V4.61241C20 4.0365 19.7659 3.48417 19.3491 3.07693C18.9324 2.66969 18.3671 2.44091 17.7778 2.44091ZM17.7778 19.8129H2.22222V7.86967H17.7778V19.8129Z"
                    fill="black"
                  />
                </svg>
                <input
                  type="date"
                  name=""
                  id=""
                  className="date"
                  onChange={(e) => {
                    const selectedDate = moment(
                      e.target.value,
                      "YYYY-MM-DD"
                    ).toDate();
                    setModifiedAppointment({
                      ...modifiedAppointment,
                      date: selectedDate,
                    });
                  }}
                />
              </StyledFlexRow>
              <StyledFlexRow className="detailRow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M10 18.5052C12.1217 18.5052 14.1566 17.6732 15.6569 16.1924C17.1571 14.7115 18 12.7031 18 10.6088C18 8.51456 17.1571 6.50609 15.6569 5.02523C14.1566 3.54437 12.1217 2.71244 10 2.71244C7.87827 2.71244 5.84344 3.54437 4.34315 5.02523C2.84285 6.50609 2 8.51456 2 10.6088C2 12.7031 2.84285 14.7115 4.34315 16.1924C5.84344 17.6732 7.87827 18.5052 10 18.5052ZM10 0.738342C11.3132 0.738342 12.6136 0.993649 13.8268 1.48969C15.0401 1.98572 16.1425 2.71278 17.0711 3.62933C17.9997 4.54589 18.7362 5.634 19.2388 6.83154C19.7413 8.02908 20 9.3126 20 10.6088C20 13.2266 18.9464 15.7372 17.0711 17.5883C15.1957 19.4394 12.6522 20.4793 10 20.4793C4.47 20.4793 0 16.0376 0 10.6088C0 7.991 1.05357 5.48041 2.92893 3.62933C4.8043 1.77826 7.34784 0.738342 10 0.738342ZM10.5 5.67358V10.8556L15 13.491L14.25 14.7051L9 11.5959V5.67358H10.5Z"
                    fill="black"
                  />
                </svg>
                <input
                  type="text"
                  name=""
                  id=""
                  value={
                    modifiedAppointment.hours !== null
                      ? modifiedAppointment.hours
                      : scheduleDetails.hours
                  }
                  onChange={(e) => {
                    setModifiedAppointment({
                      ...modifiedAppointment,
                      hours: e.target.value,
                    });
                  }}
                />
              </StyledFlexRow>
              <StyledFlexRow className="detailRow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="20"
                  viewBox="0 0 14 20"
                  fill="none"
                >
                  <path
                    d="M7 9.55828C6.33696 9.55828 5.70107 9.2983 5.23223 8.83553C4.76339 8.37276 4.5 7.74511 4.5 7.09066C4.5 6.43621 4.76339 5.80856 5.23223 5.34579C5.70107 4.88303 6.33696 4.62304 7 4.62304C7.66304 4.62304 8.29893 4.88303 8.76777 5.34579C9.23661 5.80856 9.5 6.43621 9.5 7.09066C9.5 7.41471 9.43534 7.73559 9.3097 8.03498C9.18406 8.33436 8.99991 8.60639 8.76777 8.83553C8.53562 9.06467 8.26002 9.24643 7.95671 9.37044C7.65339 9.49445 7.3283 9.55828 7 9.55828ZM7 0.181335C5.14348 0.181335 3.36301 0.90928 2.05025 2.20503C0.737498 3.50078 0 5.25819 0 7.09066C0 12.2727 7 19.9223 7 19.9223C7 19.9223 14 12.2727 14 7.09066C14 5.25819 13.2625 3.50078 11.9497 2.20503C10.637 0.90928 8.85652 0.181335 7 0.181335Z"
                    fill="black"
                  />
                </svg>
                <span>{scheduleDetails.address}</span>
              </StyledFlexRow>
              <StyledFlexRow className="detailRow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="21"
                  viewBox="0 0 23 21"
                  fill="none"
                >
                  <path
                    d="M9.63 10.5158C11.23 7.0414 15.38 5.51148 18.9 7.09075C22.42 8.67002 23.97 12.7663 22.37 16.2407C21.24 18.7083 18.75 20.2876 16 20.2876C13.3 20.2876 10.83 18.7478 9.67 16.3394H0V14.3653C0.06 13.2401 0.84 12.3221 2.34 11.5818C3.84 10.8415 5.72 10.4566 8 10.4171C8.57 10.4171 9.11 10.4664 9.63 10.5158ZM8 0.546631C9.12 0.576242 10.06 0.96119 10.81 1.70148C11.56 2.44176 11.93 3.36958 11.93 4.49482C11.93 5.62005 11.56 6.54787 10.81 7.28816C10.06 8.02844 9.12 8.39365 8 8.39365C6.88 8.39365 5.94 8.02844 5.19 7.28816C4.44 6.54787 4.07 5.62005 4.07 4.49482C4.07 3.36958 4.44 2.44176 5.19 1.70148C5.94 0.96119 6.88 0.576242 8 0.546631ZM16 18.3135C17.3261 18.3135 18.5979 17.7935 19.5355 16.868C20.4732 15.9424 21 14.6871 21 13.3782C21 12.0693 20.4732 10.814 19.5355 9.8885C18.5979 8.96296 17.3261 8.443 16 8.443C14.6739 8.443 13.4021 8.96296 12.4645 9.8885C11.5268 10.814 11 12.0693 11 13.3782C11 14.6871 11.5268 15.9424 12.4645 16.868C13.4021 17.7935 14.6739 18.3135 16 18.3135ZM15 10.4171H16.5V13.2006L18.94 14.5923L18.19 15.8755L15 14.0593V10.4171Z"
                    fill="black"
                  />
                </svg>
                <span>{scheduleDetails.clientName}</span>
              </StyledFlexRow>
              {scheduleDetails.intervenants &&
              scheduleDetails.intervenants.length > 0 ? (
                <StyledFlexRow className="detailRowIntervenants">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                  >
                    <path
                      d="M8 13C3.58 13 0 14.79 0 17V19H16V17C16 14.79 12.42 13 8 13ZM4 7C4 8.06087 4.42143 9.07828 5.17157 9.82843C5.92172 10.5786 6.93913 11 8 11C9.06087 11 10.0783 10.5786 10.8284 9.82843C11.5786 9.07828 12 8.06087 12 7M7.5 0C7.2 0 7 0.21 7 0.5V3.5H6V1C6 1 3.75 1.86 3.75 4.75C3.75 4.75 3 4.89 3 6H13C12.95 4.89 12.25 4.75 12.25 4.75C12.25 1.86 10 1 10 1V3.5H9V0.5C9 0.21 8.81 0 8.5 0H7.5Z"
                      fill="black"
                    />
                  </svg>
                  <StyledFlexRow className="intervenantsContainer">
                    {scheduleDetails.intervenants.map((intervenant, index) => {
                      return (
                        <span
                          key={index}
                          onClick={() => {
                            const newArray = [...intervenantsArray];
                            const index = newArray.indexOf(intervenant);
                            if (index > -1) {
                              // only splice array when item is found
                              newArray.splice(index, 1); // 2nd parameter means remove one item only
                            }
                            setScheduleDetails((prev) => ({
                              ...prev,
                              intervenants: newArray,
                            }));
                          }}
                        >
                          {intervenant}
                        </span>
                      );
                    })}
                  </StyledFlexRow>
                </StyledFlexRow>
              ) : (
                <StyledFlexRow className="detailRowIntervenants">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                  >
                    <path
                      d="M8 13C3.58 13 0 14.79 0 17V19H16V17C16 14.79 12.42 13 8 13ZM4 7C4 8.06087 4.42143 9.07828 5.17157 9.82843C5.92172 10.5786 6.93913 11 8 11C9.06087 11 10.0783 10.5786 10.8284 9.82843C11.5786 9.07828 12 8.06087 12 7M7.5 0C7.2 0 7 0.21 7 0.5V3.5H6V1C6 1 3.75 1.86 3.75 4.75C3.75 4.75 3 4.89 3 6H13C12.95 4.89 12.25 4.75 12.25 4.75C12.25 1.86 10 1 10 1V3.5H9V0.5C9 0.21 8.81 0 8.5 0H7.5Z"
                      fill="black"
                    />
                  </svg>
                  <StyledFlexRow className="intervenantsContainer">
                    {intervenantsArray.map((intervenant, index) => {
                      return (
                        <span
                          key={index}
                          onClick={() => {
                            const newArray = [...intervenantsArray];
                            const index = newArray.indexOf(intervenant);
                            if (index > -1) {
                              // only splice array when item is found
                              newArray.splice(index, 1); // 2nd parameter means remove one item only
                            }
                            setIntervenantsArray(newArray);
                          }}
                        >
                          {intervenant}
                        </span>
                      );
                    })}
                  </StyledFlexRow>
                </StyledFlexRow>
              )}
              <button
                onClick={() => {
                  editAppointment(modifiedAppointment);
                }}
              >
                Modifier le rendez-vous
              </button>
            </Flex>
            <div className="intervenantSelector">
              <div
                onClick={() =>
                  isIntervenantSelecting
                    ? setIsIntervenantSelecting(false)
                    : setIsIntervenantSelecting(true)
                }
                className="selected"
              >
                <div
                  className="color"
                  style={{
                    backgroundColor: "#053771",
                  }}
                ></div>
                <span>Ajouter un intervenant</span>
                <FaChevronDown />
              </div>
              {isIntervenantSelecting ? (
                <ul>
                  {employees.map((employee) => {
                    return (
                      <li
                        onClick={() => {
                          setIntervenantsArray((prev) => [
                            ...prev,
                            `${employee.firstName} ${employee.lastName}`,
                          ]);
                          setIsIntervenantSelecting(false);
                        }}
                      >
                        <div
                          className="color"
                          style={{
                            backgroundColor: "#053771",
                          }}
                        ></div>
                        <span>
                          {employee.firstName + " " + employee.lastName}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </StyledFlexRow>
          <StraightBar />
          {/* si jamais c'est un rendez vous noté, on rentrera les données juste après */}
          <Flex className="reviewColumn">
            <span>Note du rendez-vous</span>
            <StyledFlexRow className="starsRow">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </StyledFlexRow>
            <span>Commentaire:</span>
            <p>{scheduleDetails.comment}</p>
          </Flex>
        </Flex>
      ) : (
        <Flex className="mobileDetailsContainer">
          <ExitButton />
          <button
            onClick={() => {
              setDetailsState((prev) => ({
                ...prev,
                isDisplayed: true,
                isModifying: true,
              }));
            }}
          >
            Modifier le rendez-vous
          </button>
          <h4>{scheduleDetails.title}</h4>
          <Flex className="detailsColumn">
            <StyledFlexRow className="detailRow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
              >
                <path
                  d="M6.66667 10.0412H4.44444V12.2127H6.66667V10.0412ZM11.1111 10.0412H8.88889V12.2127H11.1111V10.0412ZM15.5556 10.0412H13.3333V12.2127H15.5556V10.0412ZM17.7778 2.44091H16.6667V0.269409H14.4444V2.44091H5.55556V0.269409H3.33333V2.44091H2.22222C0.988889 2.44091 0 3.41809 0 4.61241V19.8129C0 20.3889 0.234126 20.9412 0.650874 21.3484C1.06762 21.7557 1.63285 21.9844 2.22222 21.9844H17.7778C18.3671 21.9844 18.9324 21.7557 19.3491 21.3484C19.7659 20.9412 20 20.3889 20 19.8129V4.61241C20 4.0365 19.7659 3.48417 19.3491 3.07693C18.9324 2.66969 18.3671 2.44091 17.7778 2.44091ZM17.7778 19.8129H2.22222V7.86967H17.7778V19.8129Z"
                  fill="black"
                />
              </svg>
              <span className="date">{formatDate(scheduleDetails.date)}</span>
            </StyledFlexRow>
            <StyledFlexRow className="detailRow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M10 18.5052C12.1217 18.5052 14.1566 17.6732 15.6569 16.1924C17.1571 14.7115 18 12.7031 18 10.6088C18 8.51456 17.1571 6.50609 15.6569 5.02523C14.1566 3.54437 12.1217 2.71244 10 2.71244C7.87827 2.71244 5.84344 3.54437 4.34315 5.02523C2.84285 6.50609 2 8.51456 2 10.6088C2 12.7031 2.84285 14.7115 4.34315 16.1924C5.84344 17.6732 7.87827 18.5052 10 18.5052ZM10 0.738342C11.3132 0.738342 12.6136 0.993649 13.8268 1.48969C15.0401 1.98572 16.1425 2.71278 17.0711 3.62933C17.9997 4.54589 18.7362 5.634 19.2388 6.83154C19.7413 8.02908 20 9.3126 20 10.6088C20 13.2266 18.9464 15.7372 17.0711 17.5883C15.1957 19.4394 12.6522 20.4793 10 20.4793C4.47 20.4793 0 16.0376 0 10.6088C0 7.991 1.05357 5.48041 2.92893 3.62933C4.8043 1.77826 7.34784 0.738342 10 0.738342ZM10.5 5.67358V10.8556L15 13.491L14.25 14.7051L9 11.5959V5.67358H10.5Z"
                  fill="black"
                />
              </svg>
              <span>{scheduleDetails.hours}</span>
            </StyledFlexRow>
            <StyledFlexRow className="detailRow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="20"
                viewBox="0 0 14 20"
                fill="none"
              >
                <path
                  d="M7 9.55828C6.33696 9.55828 5.70107 9.2983 5.23223 8.83553C4.76339 8.37276 4.5 7.74511 4.5 7.09066C4.5 6.43621 4.76339 5.80856 5.23223 5.34579C5.70107 4.88303 6.33696 4.62304 7 4.62304C7.66304 4.62304 8.29893 4.88303 8.76777 5.34579C9.23661 5.80856 9.5 6.43621 9.5 7.09066C9.5 7.41471 9.43534 7.73559 9.3097 8.03498C9.18406 8.33436 8.99991 8.60639 8.76777 8.83553C8.53562 9.06467 8.26002 9.24643 7.95671 9.37044C7.65339 9.49445 7.3283 9.55828 7 9.55828ZM7 0.181335C5.14348 0.181335 3.36301 0.90928 2.05025 2.20503C0.737498 3.50078 0 5.25819 0 7.09066C0 12.2727 7 19.9223 7 19.9223C7 19.9223 14 12.2727 14 7.09066C14 5.25819 13.2625 3.50078 11.9497 2.20503C10.637 0.90928 8.85652 0.181335 7 0.181335Z"
                  fill="black"
                />
              </svg>
              <span>{scheduleDetails.address}</span>
            </StyledFlexRow>
            <StyledFlexRow className="detailRow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="21"
                viewBox="0 0 23 21"
                fill="none"
              >
                <path
                  d="M9.63 10.5158C11.23 7.0414 15.38 5.51148 18.9 7.09075C22.42 8.67002 23.97 12.7663 22.37 16.2407C21.24 18.7083 18.75 20.2876 16 20.2876C13.3 20.2876 10.83 18.7478 9.67 16.3394H0V14.3653C0.06 13.2401 0.84 12.3221 2.34 11.5818C3.84 10.8415 5.72 10.4566 8 10.4171C8.57 10.4171 9.11 10.4664 9.63 10.5158ZM8 0.546631C9.12 0.576242 10.06 0.96119 10.81 1.70148C11.56 2.44176 11.93 3.36958 11.93 4.49482C11.93 5.62005 11.56 6.54787 10.81 7.28816C10.06 8.02844 9.12 8.39365 8 8.39365C6.88 8.39365 5.94 8.02844 5.19 7.28816C4.44 6.54787 4.07 5.62005 4.07 4.49482C4.07 3.36958 4.44 2.44176 5.19 1.70148C5.94 0.96119 6.88 0.576242 8 0.546631ZM16 18.3135C17.3261 18.3135 18.5979 17.7935 19.5355 16.868C20.4732 15.9424 21 14.6871 21 13.3782C21 12.0693 20.4732 10.814 19.5355 9.8885C18.5979 8.96296 17.3261 8.443 16 8.443C14.6739 8.443 13.4021 8.96296 12.4645 9.8885C11.5268 10.814 11 12.0693 11 13.3782C11 14.6871 11.5268 15.9424 12.4645 16.868C13.4021 17.7935 14.6739 18.3135 16 18.3135ZM15 10.4171H16.5V13.2006L18.94 14.5923L18.19 15.8755L15 14.0593V10.4171Z"
                  fill="black"
                />
              </svg>
              <span>{scheduleDetails.clientName}</span>
            </StyledFlexRow>
            {scheduleDetails.intervenants ? (
              <StyledFlexRow className="detailRow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="19"
                  viewBox="0 0 16 19"
                  fill="none"
                >
                  <path
                    d="M8 13C3.58 13 0 14.79 0 17V19H16V17C16 14.79 12.42 13 8 13ZM4 7C4 8.06087 4.42143 9.07828 5.17157 9.82843C5.92172 10.5786 6.93913 11 8 11C9.06087 11 10.0783 10.5786 10.8284 9.82843C11.5786 9.07828 12 8.06087 12 7M7.5 0C7.2 0 7 0.21 7 0.5V3.5H6V1C6 1 3.75 1.86 3.75 4.75C3.75 4.75 3 4.89 3 6H13C12.95 4.89 12.25 4.75 12.25 4.75C12.25 1.86 10 1 10 1V3.5H9V0.5C9 0.21 8.81 0 8.5 0H7.5Z"
                    fill="black"
                  />
                </svg>
                <span>
                  {scheduleDetails.intervenants.map((intervenant, index) => (
                    <React.Fragment key={index}>
                      {intervenant}
                      {index !== scheduleDetails.intervenants.length - 1 &&
                        ", "}
                    </React.Fragment>
                  ))}
                </span>
              </StyledFlexRow>
            ) : (
              <StyledFlexRow className="detailRow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="19"
                  viewBox="0 0 16 19"
                  fill="none"
                >
                  <path
                    d="M8 13C3.58 13 0 14.79 0 17V19H16V17C16 14.79 12.42 13 8 13ZM4 7C4 8.06087 4.42143 9.07828 5.17157 9.82843C5.92172 10.5786 6.93913 11 8 11C9.06087 11 10.0783 10.5786 10.8284 9.82843C11.5786 9.07828 12 8.06087 12 7M7.5 0C7.2 0 7 0.21 7 0.5V3.5H6V1C6 1 3.75 1.86 3.75 4.75C3.75 4.75 3 4.89 3 6H13C12.95 4.89 12.25 4.75 12.25 4.75C12.25 1.86 10 1 10 1V3.5H9V0.5C9 0.21 8.81 0 8.5 0H7.5Z"
                    fill="black"
                  />
                </svg>
                <span>{""}</span>
              </StyledFlexRow>
            )}

            <StraightBar />
            {/* si jamais c'est un rendez vous noté, on rentrera les données juste après */}
            <Flex className="reviewColumn">
              <span>Note du rendez-vous</span>
              <StyledFlexRow className="starsRow">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </StyledFlexRow>
              <span>Commentaire:</span>
              <p>{scheduleDetails.comment}</p>
            </Flex>
          </Flex>
        </Flex>
      )}
    </StyledMobileDetailsCard>
  );
}

export default MobileDetailsCard;
