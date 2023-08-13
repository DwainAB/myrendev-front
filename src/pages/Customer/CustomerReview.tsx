import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Flex } from "../../components/styles/Flex.styled";
import StraightBar from "../../components/Atomes/StraightBar/StraightBar";
import { User, Appointment, Filter, Client, AuthData } from "../../types";
import { useScheduleDetailsContext } from "../../helpers/ScheduleDetailsContext";
import { StyledFlexRow } from "../../components/styles/FlexRow.styled";
import { useNavigationContext } from "../../helpers/NavigationContext";
import { useAddScheduleContext } from "../../helpers/AddScheduleContext";
import useReviewsToken from "./hooks/useReviewsToken";
import { useAuthDataContext } from "../../helpers/AuthDataContext";
import { useCalendarContext } from "../../helpers/CalendarContext";
import { StyledCustomerReviews } from "./styles/CustomerReviews.styled";
import { FaPlus, FaMinus } from "react-icons/fa";

const CustomerReviews = () => {
  interface appointmentReviewData {
    appointmentId: number;
    appointmentTitle: string;
    phoneEnterprise: string;
    companyName: string;
    appointmentDate: Date;
  }

  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [calendarState, setCalendarState] = useCalendarContext();
  const [navigationState, setNavigationState] = useNavigationContext();
  const [addSchedule, setAddSchedule] = useAddScheduleContext();
  const [isDetailsDisplayed, setIsDetailsDisplayed] =
    useScheduleDetailsContext();

  const [authData, setAuthData] = useAuthDataContext();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const { getAppointmentToReview, postReview } = useReviewsToken();

  interface MyFormValues {
    appointmentId: number;
    punctuality: number;
    friendliness: number;
    interventionQuality: number;
    comment: string;
  }

  const [punctualityPoints, setPunctualityPoints] = useState<number>(0);
  const [friendlinessPoints, setFriendlinessPoints] = useState<number>(0);
  const [interventionQualityPoints, setInterventionQualityPoints] =
    useState<number>(0);
  const [appointmentData, setAppointmentData] =
    useState<appointmentReviewData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAppointmentToReview();
      setAppointmentData(data);
      setIsDataLoading(false);
    };
    fetchData();
    console.log(appointmentData);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (!isMobile) {
        setNavigationState((prevNavigationState) => ({
          ...prevNavigationState,
          isDisplayed: true,
        }));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const initialValues: MyFormValues = {
    appointmentId: appointmentData ? appointmentData.appointmentId : 0,
    punctuality: 0,
    friendliness: 0,
    interventionQuality: 0,
    comment: "",
  };

  const validationSchema = Yup.object().shape({
    comment: Yup.string()
      .trim()
      .matches(
        /^[a-zA-Z0-9\s\-'`.,!?ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöùúûüýÿ]+$/,
        "Le commentaire contient des caractères non autorisés"
      )
      .max(500, "Le commentaire est trop long")
      .required("Le commentaire est requis"),
  });

  return (
    <>
      {isDataLoading ? null : (
        <>
          <StyledCustomerReviews>
            <Flex className="customerReviewsContainer">
              <h1>
                Comment s’est passé <strong>le rendez-vous</strong> du{" "}
                <strong>
                  {moment(appointmentData.appointmentDate).format(
                    "dddd D MMMM YYYY"
                  )}
                </strong>{" "}
                avec l'entreprise{" "}
                <strong> {appointmentData.companyName} </strong>?
              </h1>
              <StraightBar />
              <h2>
                Notez l’entreprise <strong>de 1 à 5</strong> sur ces{" "}
                <strong>différents critères</strong> :
              </h2>
              <StraightBar />
              <Flex className="pointsColumn">
                <StyledFlexRow className="pointsRow">
                  <span>Ponctualité</span>
                  <StyledFlexRow className="pointsButtonsRow">
                    <Flex
                      className="pointsButtonContainer"
                      onClick={() => {
                        punctualityPoints != 0
                          ? setPunctualityPoints((prev) => prev - 1)
                          : null;
                      }}
                    >
                      <FaMinus />
                    </Flex>
                    <span>{punctualityPoints}</span>
                    <Flex
                      className="pointsButtonContainer"
                      onClick={() => {
                        punctualityPoints != 5
                          ? setPunctualityPoints((prev) => prev + 1)
                          : null;
                      }}
                    >
                      <FaPlus />
                    </Flex>
                  </StyledFlexRow>
                </StyledFlexRow>
                <StyledFlexRow className="pointsRow">
                  <span>Amabilité</span>
                  <StyledFlexRow className="pointsButtonsRow">
                    <Flex
                      className="pointsButtonContainer"
                      onClick={() => {
                        friendlinessPoints != 0
                          ? setFriendlinessPoints((prev) => prev - 1)
                          : null;
                      }}
                    >
                      {" "}
                      <FaMinus />
                    </Flex>
                    <span>{friendlinessPoints}</span>
                    <Flex
                      className="pointsButtonContainer"
                      onClick={() => {
                        friendlinessPoints != 5
                          ? setFriendlinessPoints((prev) => prev + 1)
                          : null;
                      }}
                    >
                      <FaPlus />
                    </Flex>
                  </StyledFlexRow>
                </StyledFlexRow>
                <StyledFlexRow className="pointsRow">
                  <span>Qualité de l'intervention</span>
                  <StyledFlexRow className="pointsButtonsRow">
                    <Flex
                      className="pointsButtonContainer"
                      onClick={() => {
                        interventionQualityPoints != 0
                          ? setInterventionQualityPoints((prev) => prev - 1)
                          : null;
                      }}
                    >
                      <FaMinus />
                    </Flex>
                    <span>{interventionQualityPoints}</span>
                    <Flex
                      className="pointsButtonContainer"
                      onClick={() => {
                        interventionQualityPoints != 5
                          ? setInterventionQualityPoints((prev) => prev + 1)
                          : null;
                      }}
                    >
                      <FaPlus />
                    </Flex>
                  </StyledFlexRow>
                </StyledFlexRow>
              </Flex>
              <StraightBar />
              <h3>
                <strong>Détaillez votre expérience</strong> avec l'entreprise{" "}
                <strong>{appointmentData.companyName}</strong> :
              </h3>
              <Formik<MyFormValues>
                initialValues={initialValues}
                onSubmit={(values: MyFormValues) => {
                  const finalValues = {
                    ...values,
                    appointmentId: appointmentData.appointmentId,
                    punctuality: punctualityPoints,
                    friendliness: friendlinessPoints,
                    interventionQuality: interventionQualityPoints,
                  };
                  postReview(finalValues);
                }}
                validationSchema={validationSchema}
              >
                <Form className="commentForm">
                  <ErrorMessage name="comment" component="span" />
                  <Field
                    as="textarea"
                    type="text"
                    autoComplete="off"
                    name="comment"
                    placeholder="Votre commentaire..."
                  />

                  <button className="button" type="submit">
                    Envoyer l'avis
                  </button>
                </Form>
              </Formik>
            </Flex>
          </StyledCustomerReviews>
        </>
      )}
    </>
  );
};

export default CustomerReviews;
