import { createContext, useContext, useState } from "react";
import { User, Appointment, Filter, Client } from "../types";

type ScheduleDetailsContextType = [
  detailsState: {
    isDisplayed: boolean;
    details: Appointment;
    isModifying: boolean;
  },
  setDetailsState: React.Dispatch<
    React.SetStateAction<{
      isDisplayed: boolean;
      details: Appointment;
      isModifying: boolean;
    }>
  >
];

const ScheduleDetailsContext = createContext<ScheduleDetailsContextType>([
  {
    isDisplayed: false,
    details: null,
    isModifying: false,
  },
  () => {},
]);

export const ScheduleDetailsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [detailsState, setDetailsState] = useState({
    isDisplayed: false,
    details: null,
    isModifying: false,
  });
  return (
    <ScheduleDetailsContext.Provider value={[detailsState, setDetailsState]}>
      {children}
    </ScheduleDetailsContext.Provider>
  );
};

export const useScheduleDetailsContext = () => {
  return useContext(ScheduleDetailsContext);
};
