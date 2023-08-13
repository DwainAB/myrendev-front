// useVerifyToken.ts
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData, Appointment, Filter, Client } from "../../../types";
import { useAuthDataContext } from "../../../helpers/AuthDataContext";

const usePostInvitationAppointment = () => {
  let navigate = useNavigate();
  const [authData] = useAuthDataContext();

  const postInvitationAppointment = async (
    appointments: Appointment[],
    client: Client
  ) => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/connexion");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3001/appointment/createappointmentwithinvitation",
          { appointments, client },
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );

        if (response.data.error) {
          alert("Une erreur est survenue lors de l'envoi du rendez-vous");
        } else {
          alert("Rendez-vous envoyé avec succès");
          location.reload();
          console.log(response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
      }
    }
  };

  return { postInvitationAppointment };
};

export default usePostInvitationAppointment;
