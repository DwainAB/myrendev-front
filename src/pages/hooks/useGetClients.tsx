// useVerifyToken.ts
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData, Appointment, Client } from "../../types";
import { useAuthDataContext } from "../../helpers/AuthDataContext";

const useGetClients = () => {
  let navigate = useNavigate();
  const [authData] = useAuthDataContext();

  const getClients = async (
    setAuthData: React.Dispatch<
      React.SetStateAction<{ loginData: AuthData; appointments: Appointment[] }>
    >
  ) => {
    var clientsArray: Client[] = [];
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
                  "http://localhost:3001/client/getallclients",
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
                  clientsArray = response.data.listOfClients as Client[];
                }
              } catch (error) {
                console.error(
                  "Erreur lors de la récupération des clients :",
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

    return clientsArray;
  };

  return { getClients };
};

export default useGetClients;
