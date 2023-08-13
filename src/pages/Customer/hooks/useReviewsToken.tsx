// useVerifyToken.ts
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthData, Appointment, Filter } from "../../../types";
import { useCustomerContext } from "../../../helpers/CustomerContext";

const useReviewsToken = () => {
  interface appointmentReviewData {
    appointmentId: number;
    appointmentTitle: string;
    phoneEnterprise: string;
    companyName: string;
    appointmentDate: Date;
  }

  const [customerState, setCustomerState] = useCustomerContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reviewToken = searchParams.get("reviewToken");
  let navigate = useNavigate();
  var appointmentData: appointmentReviewData;

  const getAppointmentToReview = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/appointment/getappointmenttoreview",
        {
          params: { reviewToken: reviewToken },
        }
      );

      if (response.data.error) {
        alert("Une erreur est survenue, veuillez recharger la page");
      } else {
        // appointmentsArray = response.data.listOfAppointments as Appointment[];
        console.log(response.data);
        appointmentData = response.data as appointmentReviewData;
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du token :", error);
    }
    return appointmentData as appointmentReviewData;
  };

  const postReview = async (data: any) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/appointment/postreview",
        {
          data,
        }
      );

      if (response.data.error) {
        alert("Une erreur est survenue, veuillez recharger la page");
      } else {
        // appointmentsArray = response.data.listOfAppointments as Appointment[];
        console.log(response.data);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du token :", error);
    }
    console.log(data);
  };

  return { getAppointmentToReview, postReview };
};

export default useReviewsToken;
