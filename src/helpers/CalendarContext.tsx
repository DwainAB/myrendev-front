import { createContext, useContext, useState } from "react";
import moment from "moment";

const currentDateMoment = moment();

type CalendarContextType = [
  calendarState: {
    currentDate: Date;
  },
  setCalendarState: React.Dispatch<
    React.SetStateAction<{
      currentDate: Date;
    }>
  >
];

const CalendarContext = createContext<CalendarContextType>([
  {
    currentDate: currentDateMoment.toDate(),
  },
  () => {},
]);

export const CalendarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [calendarState, setCalendarState] = useState({
    currentDate: currentDateMoment.toDate(),
  });
  return (
    <CalendarContext.Provider value={[calendarState, setCalendarState]}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  return useContext(CalendarContext);
};
