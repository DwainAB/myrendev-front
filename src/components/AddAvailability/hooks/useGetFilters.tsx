// useVerifyToken.ts
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData, Appointment, Filter } from "../../../types";
import { useAuthDataContext } from "../../../helpers/AuthDataContext";

const useGetFilters = () => {
  let navigate = useNavigate();
  const [authData] = useAuthDataContext();

  const getFilters = async (
    setAuthData: React.Dispatch<
      React.SetStateAction<{ loginData: AuthData; appointments: Appointment[] }>
    >
  ) => {
    var filtersArray: Filter[] = [];
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
                  "http://localhost:3001/filter/getallfilters",
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
                  filtersArray = response.data.listOfFilters as Filter[];
                }
              } catch (error) {
                console.error(
                  "Erreur lors de la récupération des filtres :",
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
    return filtersArray;
  };

  return { getFilters };
};

export default useGetFilters;
