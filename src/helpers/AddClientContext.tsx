import { createContext, useContext, useState } from "react";
import { User, Appointment, Filter, Client } from "../types";

type AddClientContextType = [
  addClientState: {
    isDisplayed: boolean;
  },
  setAddClientState: React.Dispatch<
    React.SetStateAction<{
      isDisplayed: boolean;
    }>
  >
];

const AddClientContext = createContext<AddClientContextType>([
  {
    isDisplayed: false,
  },
  () => {},
]);

export const AddClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [addClientState, setAddClientState] = useState({
    isDisplayed: false,
  });
  return (
    <AddClientContext.Provider value={[addClientState, setAddClientState]}>
      {children}
    </AddClientContext.Provider>
  );
};

export const useAddClientContext = () => {
  return useContext(AddClientContext);
};
