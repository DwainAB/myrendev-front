import { StyledFlexRow } from "./components/styles/FlexRow.styled";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import moment from "moment";
import "moment/locale/fr";
import GlobalStyles from "./components/styles/Global";
import { CarouselProvider } from "./helpers/CarouselContext";
import { AuthPageProvider } from "./helpers/AuthPageContext";
import LoginPage from "./pages/LoginPage";
import Welcome from "./pages/Welcome";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { NavigationProvider } from "./helpers/NavigationContext";
import { ScheduleDetailsProvider } from "./helpers/ScheduleDetailsContext";
import Contacts from "./pages/Contacts";
import OldSchedules from "./pages/OldSchedules";
import Reviews from "./pages/Reviews";
import { AddScheduleProvider } from "./helpers/AddScheduleContext";
import { AuthDataProvider } from "./helpers/AuthDataContext";
import { CalendarProvider } from "./helpers/CalendarContext";
import { AddClientProvider } from "./helpers/AddClientContext";
import FiltersPage from "./pages/FiltersPage";
import { AddFilterProvider } from "./helpers/AddFilterContext";
import CustomerCalendar from "./pages/Customer/CustomerCalendar";
import { CustomerContextProvider } from "./helpers/CustomerContext";
import CustomerReviews from "./pages/Customer/CustomerReview";

function App() {
  moment.locale("fr", {
    months:
      "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
        "_"
      ),
    monthsShort:
      "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split(
        "_"
      ),
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

  return (
    <CarouselProvider>
      <CalendarProvider>
        <AuthDataProvider>
          <NavigationProvider>
            <AddScheduleProvider>
              <AuthPageProvider>
                <AddClientProvider>
                  <AddFilterProvider>
                    <ScheduleDetailsProvider>
                      <CustomerContextProvider>
                        <GlobalStyles />
                        <StyledFlexRow>
                          <Router>
                            <Routes>
                              <Route
                                path="/connexion"
                                element={<LoginPage />}
                              />
                              <Route path="/" element={<Welcome />} />
                              <Route path="/notes" element={<Reviews />} />
                              <Route
                                path="/filtres"
                                element={<FiltersPage />}
                              />
                              <Route path="/contacts" element={<Contacts />} />
                              <Route
                                path="/calendrierclient"
                                element={<CustomerCalendar />}
                              />
                              <Route
                                path="/ajouterunenote"
                                element={<CustomerReviews />}
                              />
                            </Routes>
                          </Router>
                        </StyledFlexRow>
                      </CustomerContextProvider>
                    </ScheduleDetailsProvider>
                  </AddFilterProvider>
                </AddClientProvider>
              </AuthPageProvider>
            </AddScheduleProvider>
          </NavigationProvider>
        </AuthDataProvider>
      </CalendarProvider>
    </CarouselProvider>
  );
}

export default App;
