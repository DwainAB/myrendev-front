// useVerifyToken.ts
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthData, Appointment, Filter } from "../../../types";
import { useCustomerContext } from "../../../helpers/CustomerContext";

const useGetInvitationAppointments = () => {
  const [customerState, setCustomerState] = useCustomerContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const invitationToken = searchParams.get("invitationToken");
  let navigate = useNavigate();

  const getInvitationAppointments = async () => {
    // var appointmentsArray: Appointment[] = [];
    try {
      const response = await axios.get(
        "http://localhost:3001/appointment/getinvitationappointments",
        {
          params: { invitationToken: invitationToken },
        }
      );

      if (response.data.error) {
        alert("Une erreur est survenue, veuillez recharger la page");
      } else {
        // appointmentsArray = response.data.listOfAppointments as Appointment[];
        console.log(response.data);
        setCustomerState((prevState) => ({
          ...prevState,
          appointments: response.data.listOfAppointments,
          clientDetails: response.data.invitationTokenDecoded,
        }));
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du token :", error);
    }
    // return appointmentsArray;
  };

  return { getInvitationAppointments };
};

export default useGetInvitationAppointments;
