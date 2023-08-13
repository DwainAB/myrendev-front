import { createContext, useContext, useState } from "react";

type AddScheduleContextType = [
  addScheduleState: {
    isDisplayed: boolean;
  },
  setAddScheduleState: React.Dispatch<
    React.SetStateAction<{
      isDisplayed: boolean;
    }>
  >
];

const AddScheduleContext = createContext<AddScheduleContextType>([
  {
    isDisplayed: false,
  },
  () => {},
]);

export const AddScheduleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [addScheduleState, setAddScheduleState] = useState({
    isDisplayed: false,
  });
  return (
    <AddScheduleContext.Provider
      value={[addScheduleState, setAddScheduleState]}
    >
      {children}
    </AddScheduleContext.Provider>
  );
};

export const useAddScheduleContext = () => {
  return useContext(AddScheduleContext);
};
