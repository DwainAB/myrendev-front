import { useState, useEffect } from "react";
import moment, { Moment } from "moment";
import "moment/locale/fr";
import MobileHeader from "../components/MobileHeader/MobileHeader";
import { Flex } from "../components/styles/Flex.styled";
import StraightBar from "../components/Atomes/StraightBar/StraightBar";
import { User, Appointment, Filter, Client } from "../types";
import ScheduleCard from "../components/ScheduleCard/ScheduleCard";
import MobileDetailsCard from "../components/MobileDetailsCard/MobileDetailsCard";
import { useScheduleDetailsContext } from "../helpers/ScheduleDetailsContext";
import { useNavigationContext } from "../helpers/NavigationContext";
import { StyledDesktopPage } from "./styles/Desktop.styled";
import { StyledFlexRow } from "../components/styles/FlexRow.styled";
import { useAuthDataContext } from "../helpers/AuthDataContext";
import useVerifyToken from "./hooks/useVerifyToken";

moment.locale("fr", {
  months:
    "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
      "_"
    ),
  monthsShort:
    "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
  monthsParseExact: true,
  weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
  weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
  weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm",
  },
  calendar: {
    sameDay: "[Aujourd’hui à] LT",
    nextDay: "[Demain à] LT",
    nextWeek: "dddd [à] LT",
    lastDay: "[Hier à] LT",
    lastWeek: "dddd [dernier à] LT",
    sameElse: "L",
  },
  relativeTime: {
    future: "dans %s",
    past: "il y a %s",
    s: "quelques secondes",
    m: "une minute",
    mm: "%d minutes",
    h: "une heure",
    hh: "%d heures",
    d: "un jour",
    dd: "%d jours",
    M: "un mois",
    MM: "%d mois",
    y: "un an",
    yy: "%d ans",
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
  ordinal: function (number) {
    return number + (number === 1 ? "er" : "e");
  },
  meridiemParse: /PD|MD/,
  isPM: function (input) {
    return input.charAt(0) === "M";
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem: function (hours, minutes, isLower) {
    return hours < 12 ? "PD" : "MD";
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // Used to determine first week of the year.
  },
});

function OldSchedules() {
  const [navigationState, setNavigationState] = useNavigationContext();
  const [isDetailsDisplayed, setIsDetailsDisplayed] =
    useScheduleDetailsContext();
  const [schedules, setSchedules] = useState<Appointment[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [authData, setAuthData] = useAuthDataContext();

  const { verifyToken } = useVerifyToken();

  useEffect(() => {
    verifyToken(setAuthData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData.loginData == null]);

  useEffect(() => {
    moment.locale("fr");
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const sortedAppointments = data.appointments.sort(compareAppointments);
        setSchedules(sortedAppointments);
      })
      .catch((error) => console.error(error));
  }, []);

  function compareAppointments(a, b) {
    const dateA = moment(a.date);
    const dateB = moment(b.date);

    if (dateA.isBefore(dateB)) {
      return 1;
    } else if (dateA.isAfter(dateB)) {
      return -1;
    } else {
      return 0;
    }
  }

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
  }, [window.innerWidth]);

  useEffect(() => {
    setNavigationState((prevNavigationState) => ({
      ...prevNavigationState,
      isDisplayed: true,
    }));
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setSchedules(data.appointments))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {isMobile ? (
        <Flex>
          <MobileHeader />
          {isDetailsDisplayed.isDisplayed && isDetailsDisplayed.details ? (
            <MobileDetailsCard />
          ) : null}
          <StraightBar />
          {schedules.map((schedule) =>
            schedule.note ? (
              <ScheduleCard key={schedule.id} data={schedule} />
            ) : null
          )}
        </Flex>
      ) : (
        <StyledDesktopPage>
          <StyledFlexRow className="rowContainer">
            <div className="agenda"></div>
            <Flex className="sideBarRight">
              <MobileHeader />

              <StraightBar />
              {schedules.map((schedule) =>
                schedule.note ? (
                  <ScheduleCard key={schedule.id} data={schedule} />
                ) : null
              )}
            </Flex>
          </StyledFlexRow>
        </StyledDesktopPage>
      )}
    </>
  );
}

export default OldSchedules;
