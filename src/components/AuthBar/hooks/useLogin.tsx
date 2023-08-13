import { useState, useContext } from "react";
import axios from "axios";
import { useAuthDataContext } from "../../../helpers/AuthDataContext";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../../types";

const useLogin = () => {
  const [authData, setAuthData] = useAuthDataContext();
  const navigate = useNavigate();

  const onSubmit = (sentData: unknown) => {
    axios
      .post("http://localhost:3001/auth/login", sentData)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          let dataReceived: AuthData = response.data as AuthData;
          localStorage.setItem("accessToken", response.data.token);
          setAuthData((prev) => ({
            ...prev,
            loginData: {
              phoneEnterprise: dataReceived.phoneEnterprise,
              companyName: dataReceived.companyName,
              email: dataReceived.email,
              firstName: dataReceived.firstName,
              lastName: dataReceived.lastName,
              role: dataReceived.role,
              id: dataReceived.id,
            },
          }));

          navigate("/");
        }
      });
  };

  return { onSubmit };
};

export default useLogin;
