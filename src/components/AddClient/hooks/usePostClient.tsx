// useVerifyToken.ts
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData, Appointment, Filter, Client } from "../../../types";
import { useAuthDataContext } from "../../../helpers/AuthDataContext";

const usePostClient = () => {
  let navigate = useNavigate();
  const [authData] = useAuthDataContext();

  const postClient = async (data: Client) => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/connexion");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3001/client/createclient",
          data,
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        );

        if (response.data.error) {
          alert("Une erreur est survenue lors de l'ajout du nouveau client");
        } else {
          alert("client ajouté avec succès !");
          location.reload();
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
      }
    }
  };

  return { postClient };
};

export default usePostClient;
