// useVerifyToken.ts
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData, Appointment, Filter } from "../../../types";
import { useAuthDataContext } from "../../../helpers/AuthDataContext";

const usePostAppointment = () => {
  let navigate = useNavigate();
  const [authData] = useAuthDataContext();

  const postAppointment = async (data: Appointment[]) => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/connexion");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3001/appointment/createappointment",
          data,
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );

        if (response.data.error) {
          alert("Une erreur est survenue lors de l'envoi du rendez-vous");
        } else {
          alert("Rendez-vous envoyé avec succès");
          location.reload();
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
      }
    }
  };

  return { postAppointment };
};

export default usePostAppointment;
