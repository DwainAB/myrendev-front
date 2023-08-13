import { useState, useContext } from "react";
import axios from "axios";
import { useAuthDataContext } from "../../../helpers/AuthDataContext";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../../types";

const useRegister = () => {
  const [authData, setAuthData] = useAuthDataContext();
  const navigate = useNavigate();

  const onSubmit = (sentData: unknown) => {
    axios
      .post("http://localhost:3001/auth/register", sentData)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          location.reload();
        }
      });
  };

  return { onSubmit };
};

export default useRegister;
