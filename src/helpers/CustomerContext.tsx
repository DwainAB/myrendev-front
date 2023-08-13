import { createContext, useContext, useState } from "react";
import { AuthData, Appointment, Client } from "../types";

type CustomerContextType = [
  customerState: {
    clientDetails: Client;
    appointments: Appointment[];
    chosenAppointment: Appointment;
  },
  setCustomerState: React.Dispatch<
    React.SetStateAction<{
      clientDetails: Client;
      appointments: Appointment[];
      chosenAppointment: Appointment;
    }>
  >
];

const CustomerContext = createContext<CustomerContextType>([
  {
    clientDetails: null,
    appointments: [],
    chosenAppointment: null,
  },
  () => {},
]);

export const CustomerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authData, setAuthData] = useState({
    clientDetails: null,
    appointments: [],
    chosenAppointment: null,
  });
  return (
    <CustomerContext.Provider value={[authData, setAuthData]}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => {
  return useContext(CustomerContext);
};
