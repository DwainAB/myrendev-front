import moment from "moment";
import { FaBars } from "react-icons/fa";
import { StyledFlexRow } from "../styles/FlexRow.styled";
import { Flex } from "../styles/Flex.styled";
import { StyledMobileHeader } from "./styles/MobileHeader.styled";
import { User, Appointment, Filter, Client } from "../../types";
import { useNavigationContext } from "../../helpers/NavigationContext";
import { useAuthDataContext } from "../../helpers/AuthDataContext";
import { useCalendarContext } from "../../helpers/CalendarContext";

function MobileHeader() {
  const [calendarState, setCalendarState] = useCalendarContext();
  const [navigationState, setNavigationState] = useNavigationContext();
  const [authData, setAuthData] = useAuthDataContext();
  var nextAppointments: Appointment[] = authData.appointments.filter(
    (appointment) =>
      appointment.clientName != null &&
      appointment.clientName !== "" &&
      moment(appointment.date).isSame(calendarState.currentDate, "day")
  );

  const momentDate = moment(calendarState.currentDate);

  return (
    <>
      <StyledMobileHeader>
        <Flex>
          <StyledFlexRow>
            <FaBars
              onClick={() =>
                setNavigationState((prevNavigationState) => ({
                  ...prevNavigationState,
                  isDisplayed: true,
                }))
              }
            />
            <div className="userIcon"></div>
          </StyledFlexRow>
          <p>{momentDate.format("dddd D MMMM YYYY")}</p>
          {navigationState.navigationPage == 1 ? (
            <>
              <h1>
                Vous avez {nextAppointments.length} rendez-vous le{" "}
                {momentDate.format("dddd D MMMM YYYY")} !
              </h1>
            </>
          ) : navigationState.navigationPage == 2 ? (
            <h1>Notes et commentaires</h1>
          ) : navigationState.navigationPage == 3 ? (
            <h1>Vos contacts</h1>
          ) : (
            <h1>Vos filtres</h1>
          )}
        </Flex>
      </StyledMobileHeader>
    </>
  );
}

export default MobileHeader;
