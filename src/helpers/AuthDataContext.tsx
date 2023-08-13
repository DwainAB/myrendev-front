import { createContext, useContext, useState } from "react";
import { AuthData, Appointment } from "../types";

type AuthDataContextType = [
  authData: {
    loginData: AuthData;
    appointments: Appointment[];
  },
  setAuthData: React.Dispatch<
    React.SetStateAction<{
      loginData: AuthData;
      appointments: Appointment[];
    }>
  >
];

const AuthDataContext = createContext<AuthDataContextType>([
  {
    loginData: {
      phoneEnterprise: null,
      companyName: null,
      email: null,
      firstName: null,
      lastName: null,
      role: null,
      id: null,
    },
    appointments: [],
  },
  () => {},
]);

export const AuthDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authData, setAuthData] = useState({
    loginData: {
      phoneEnterprise: null,
      companyName: null,
      email: null,
      firstName: null,
      lastName: null,
      role: null,
      id: null,
    },
    appointments: [],
  });
  return (
    <AuthDataContext.Provider value={[authData, setAuthData]}>
      {children}
    </AuthDataContext.Provider>
  );
};

export const useAuthDataContext = () => {
  return useContext(AuthDataContext);
};
