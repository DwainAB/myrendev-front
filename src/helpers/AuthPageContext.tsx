import { createContext, useContext, useState } from "react";

type AuthPageContextType = [
  authPage: {
    styled: boolean;
    loginPage: number;
  },
  setAuthPage: React.Dispatch<
    React.SetStateAction<{
      styled: boolean;
      loginPage: number;
    }>
  >
];

const AuthPageContext = createContext<AuthPageContextType>([
  {
    styled: false,
    loginPage: 1,
  },
  () => {},
]);

export const AuthPageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authPage, setAuthPage] = useState({
    styled: false,
    loginPage: 1,
  });
  return (
    <AuthPageContext.Provider value={[authPage, setAuthPage]}>
      {children}
    </AuthPageContext.Provider>
  );
};

export const useAuthPage = () => {
  return useContext(AuthPageContext);
};
