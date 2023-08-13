import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import { Flex } from "../../components/styles/Flex.styled";
import StraightBar from "../../components/Atomes/StraightBar/StraightBar";
import { User, Appointment, Filter, Client, AuthData } from "../../types";
import ScheduleCard from "../../components/ScheduleCard/ScheduleCard";
import SectionTitle from "../../components/Atomes/SectionTitle/SectionTitle";
import AddCard from "../../components/AddCard/AddCard";
import { useScheduleDetailsContext } from "../../helpers/ScheduleDetailsContext";
import { StyledFlexRow } from "../../components/styles/FlexRow.styled";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { StyledDesktopPage } from "../styles/Desktop.styled";
import { useNavigationContext } from "../../helpers/NavigationContext";
import AddAvailability from "../../components/AddAvailability/AddAvailability";
import { useAddScheduleContext } from "../../helpers/AddScheduleContext";
import useVerifyToken from "../hooks/useVerifyToken";
import useGetInvitationAppointments from "./hooks/useGetInvitationAppointments";
import { useAuthDataContext } from "../../helpers/AuthDataContext";
import { useCalendarContext } from "../../helpers/CalendarContext";
import CustomerDesktopCalendar from "./components/CustomerDesktopCalendar";
import CustomerSectionTitle from "./components/CustomerSectionTitle/CustomerSectionTitle";
import CustomerStraightBar from "./components/CustomerStraightBar/CustomerStraightBar";
import CustomerNavigationBar from "./components/CustomerNavigationBar/CustomerNavigationBar";
import CustomerAppointmentConfirmation from "./components/CustomerAppointmentConfirmation/CustomerAppointmentConfirmation";

const CustomerCalendar = () => {
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [calendarState, setCalendarState] = useCalendarContext();
  const [navigationState, setNavigationState] = useNavigationContext();
  const [addSchedule, setAddSchedule] = useAddScheduleContext();
  const [isDetailsDisplayed, setIsDetailsDisplayed] =
    useScheduleDetailsContext();

  const [authData, setAuthData] = useAuthDataContext();

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  const { getInvitationAppointments } = useGetInvitationAppointments();

  var todayAppointments = authData.appointments.filter((appointment) =>
    moment(appointment.date).isSame(calendarState.currentDate, "day")
  );

  useEffect(() => {
    const fetchData = async () => {
      await getInvitationAppointments();
      setIsDataLoading(false);
    };
    fetchData();
  }, []);

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
      {isDataLoading ? null : (
        <>
          {isMobile ? (
            <>
              <CustomerNavigationBar />
              <Flex>
                {addSchedule.isDisplayed ? <AddAvailability /> : null}
                <MobileHeader />
                {isDetailsDisplayed.isDisplayed &&
                isDetailsDisplayed.details ? (
                  <CustomerAppointmentConfirmation />
                ) : null}
                <CustomerDesktopCalendar />
                <StraightBar />
                {todayAppointments.map((appointment) =>
                  appointment.clientName == null ? null : (
                    <ScheduleCard key={appointment.id} data={appointment} />
                  )
                )}
                <StraightBar />
                <SectionTitle
                  title={
                    "Vos disponibilités du" +
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
            </>
          ) : (
            <>
              {isDetailsDisplayed.isDisplayed && isDetailsDisplayed.details ? (
                <CustomerAppointmentConfirmation />
              ) : null}
              <StyledDesktopPage>
                <CustomerSectionTitle title="Choisissez la date de votre rendez-vous !" />
                <CustomerStraightBar />
                {addSchedule.isDisplayed ? <AddAvailability /> : null}
                <StyledFlexRow className="rowContainer rowContainerCustomer">
                  <CustomerDesktopCalendar />
                </StyledFlexRow>
              </StyledDesktopPage>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CustomerCalendar;
