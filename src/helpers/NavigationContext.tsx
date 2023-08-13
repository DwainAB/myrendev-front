import { createContext, useContext, useState } from "react";

type NavigationContextType = [
  navigationState: {
    isDisplayed: boolean;
    navigationPage: number;
  },
  setNavigationState: React.Dispatch<
    React.SetStateAction<{
      isDisplayed: boolean;
      navigationPage: number;
    }>
  >
];

const NavigationContext = createContext<NavigationContextType>([
  {
    isDisplayed: false,
    navigationPage: 1,
  },
  () => {},
]);

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [navigationState, setNavigationState] = useState({
    isDisplayed: false,
    navigationPage: 1,
  });
  return (
    <NavigationContext.Provider value={[navigationState, setNavigationState]}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  return useContext(NavigationContext);
};
