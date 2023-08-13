import { createContext, useContext, useState } from "react";
import { User, Appointment, Filter, Client } from "../types";

type AddFilterContextType = [
  addFilterState: {
    isDisplayed: boolean;
  },
  setAddFilterState: React.Dispatch<
    React.SetStateAction<{
      isDisplayed: boolean;
    }>
  >
];

const AddFilterContext = createContext<AddFilterContextType>([
  {
    isDisplayed: false,
  },
  () => {},
]);

export const AddFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [addFilterState, setAddFilterState] = useState({
    isDisplayed: false,
  });
  return (
    <AddFilterContext.Provider value={[addFilterState, setAddFilterState]}>
      {children}
    </AddFilterContext.Provider>
  );
};

export const useAddFilterContext = () => {
  return useContext(AddFilterContext);
};
