// useVerifyToken.ts
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData, Appointment } from "../../types";
import { useAuthDataContext } from "../../helpers/AuthDataContext";

const useGetAppointments = () => {
  let navigate = useNavigate();
  const [authData] = useAuthDataContext();

  const getAppointments = async (
    setAuthData: React.Dispatch<
      React.SetStateAction<{ loginData: AuthData; appointments: Appointment[] }>
    >
  ) => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/connexion");
    } else {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/verifytoken",
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );

        if (response.data.error) {
          alert("Session expirée, veuillez vous reconnecter !");
          localStorage.removeItem("accessToken");
          navigate("/connexion");
        } else {
          const dataReceived: AuthData | undefined = response.data as AuthData;

          // Vérifier si `dataReceived` contient des données avant de mettre à jour le contexte
          if (dataReceived.role != null) {
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
            if (
              dataReceived.role == "admin" ||
              dataReceived.role == "secretary"
            ) {
              try {
                const response = await axios.get(
                  "http://localhost:3001/appointment/getallappointments",
                  {
                    headers: {
                      currentUser: JSON.stringify({
                        id: dataReceived.id,
                        role: dataReceived.role,
                        phoneEnterprise: dataReceived.phoneEnterprise,
                      }),
                    },
                  }
                );

                if (response.data.error) {
                  console.log(response.data.error);
                } else {
                  setAuthData((prev) => ({
                    ...prev,
                    appointments: response.data
                      .listOfAppointments as Appointment[],
                  }));
                }
              } catch (error) {
                console.error(
                  "Erreur lors de la récupération des rendez-vous :",
                  error
                );
              }
            }
          }
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
      }
    }
  };

  return { getAppointments };
};

export default useGetAppointments;
