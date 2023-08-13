import { useState, useEffect, useContext } from "react";
import moment from "moment";
import MobileHeader from "../components/MobileHeader/MobileHeader";
import { Flex } from "../components/styles/Flex.styled";
import StraightBar from "../components/Atomes/StraightBar/StraightBar";
import { User, Appointment, Filter, Client } from "../types";
import ScheduleCard from "../components/ScheduleCard/ScheduleCard";
import SectionTitle from "../components/Atomes/SectionTitle/SectionTitle";
import AddCard from "../components/AddCard/AddCard";
import MobileDetailsCard from "../components/MobileDetailsCard/MobileDetailsCard";
import { useScheduleDetailsContext } from "../helpers/ScheduleDetailsContext";
import { StyledFlexRow } from "../components/styles/FlexRow.styled";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { StyledDesktopPage } from "./styles/Desktop.styled";
import { useNavigationContext } from "../helpers/NavigationContext";
import AddAvailability from "../components/AddAvailability/AddAvailability";
import { useAddScheduleContext } from "../helpers/AddScheduleContext";
import useVerifyToken from "./hooks/useVerifyToken";
import useGetAppointments from "./hooks/useGetAppointments";
import { useAuthDataContext } from "../helpers/AuthDataContext";
import { useCalendarContext } from "../helpers/CalendarContext";
import { AuthData } from "../types";
import DesktopCalendar from "../components/DesktopCalendar/DesktopCalendar";

const Welcome = () => {
  const [calendarState, setCalendarState] = useCalendarContext();
  const [navigationState, setNavigationState] = useNavigationContext();
  const [addSchedule, setAddSchedule] = useAddScheduleContext();
  const [isDetailsDisplayed, setIsDetailsDisplayed] =
    useScheduleDetailsContext();

  const [authData, setAuthData] = useAuthDataContext();

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  const { verifyToken } = useVerifyToken();
  const { getAppointments } = useGetAppointments();

  const currentDate = moment().toDate();

  var todayAppointments = authData.appointments.filter((appointment) =>
    moment(appointment.date).isSame(calendarState.currentDate, "day")
  );

  useEffect(() => {
    verifyToken(setAuthData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData.loginData == null]);

  useEffect(() => {
    getAppointments(setAuthData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData.loginData == null]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (!isMobile) {
        setNavigationState((prevNavigationState) => ({
          ...prevNavigationState,
          isDisplayed: true,
        }));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setNavigationState((prevNavigationState) => ({
      ...prevNavigationState,
      isDisplayed: true,
    }));
  }, []);

  return (
    <>
      {isDetailsDisplayed.isDisplayed && isDetailsDisplayed.details ? (
        <MobileDetailsCard />
      ) : null}
      {isMobile ? (
        <Flex>
          <NavigationBar />
          {addSchedule.isDisplayed ? <AddAvailability /> : null}

          <MobileHeader />

          <DesktopCalendar />
          <StraightBar />
          {todayAppointments.map((appointment) =>
            appointment.clientName == null ? null : (
              <ScheduleCard key={appointment.id} data={appointment} />
            )
          )}
          <StraightBar />
          <SectionTitle
            title={
              "Vos disponibilités du " +
              moment(calendarState.currentDate).format("dddd D MMMM YYYY")
            }
          />
          <StraightBar />
          {todayAppointments.map((appointment) =>
            appointment.clientName ? null : (
              <ScheduleCard key={appointment.id} data={appointment} />
            )
          )}
          <AddCard />
        </Flex>
      ) : (
        <>
          {isDetailsDisplayed.isDisplayed && isDetailsDisplayed.details ? (
            <MobileDetailsCard />
          ) : null}
          <NavigationBar />
          <StyledDesktopPage>
            {addSchedule.isDisplayed ? <AddAvailability /> : null}
            <StyledFlexRow className="rowContainer">
              <DesktopCalendar />
              <Flex className="sideBarRight">
                <MobileHeader />
                <StraightBar />
                {todayAppointments.map((appointment) =>
                  appointment.clientName == null ? null : (
                    <ScheduleCard key={appointment.id} data={appointment} />
                  )
                )}
                <StraightBar />
                <SectionTitle
                  title={
                    currentDate.getTime() == calendarState.currentDate.getTime()
                      ? "Vos disponibilités d'aujourd'hui"
                      : "Vos disponibilités du " +
                        moment(calendarState.currentDate).format(
                          "dddd D MMMM YYYY"
                        )
                  }
                />
                <StraightBar />
                {todayAppointments.map((appointment) =>
                  appointment.clientName ? null : (
                    <ScheduleCard key={appointment.id} data={appointment} />
                  )
                )}
                <AddCard />
              </Flex>
            </StyledFlexRow>
          </StyledDesktopPage>
        </>
      )}
    </>
  );
};

export default Welcome;
