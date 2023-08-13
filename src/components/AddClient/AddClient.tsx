import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { StyledAddAvailability } from "../AddAvailability/styles/AddAvailability.styled";
import { Flex } from "../styles/Flex.styled";
import StraightBar from "../Atomes/StraightBar/StraightBar";
import { StyledFlexRow } from "../styles/FlexRow.styled";
import { useAddClientContext } from "../../helpers/AddClientContext";
import { useAuthDataContext } from "../../helpers/AuthDataContext";
import usePostClient from "./hooks/usePostClient";

function AddClient() {
  const [authData, setAuthData] = useAuthDataContext();
  const { postClient } = usePostClient();
  const initialValues = {
    phoneEnterprise: authData.loginData.phoneEnterprise,
    companyName: authData.loginData.companyName,
    clientLastName: "",
    clientFirstName: "",
    clientCompany: "",
    clientPhone: "",
    clientPhone2: "",
    clientEmail: "",
    clientAddress: "",
    clientDepartment: "",
    clientCity: "",
  };

  const [addClient, setAddClient] = useAddClientContext();

  const validationSchema = Yup.object().shape({
    clientFirstName: Yup.string()
      .min(3, "Le prénom doit contenir au moins 3 caractères")
      .max(15, "Le prénom doit contenir au maximum 15 caractères")
      .required("Ce champ est requis !")
      .matches(
        /^[a-zA-ZÀ-ÿ0-9 '-]+$/,
        "Le prénom ne doit contenir que des lettres, des chiffres, des espaces, des apostrophes et des tirets."
      ),
    clientLastName: Yup.string()
      .min(3, "Le nom doit contenir au moins 3 caractères")
      .max(15, "Le nom doit contenir au maximum 15 caractères")
      .required("Ce champ est requis !")
      .matches(
        /^[a-zA-ZÀ-ÿ0-9 '-]+$/,
        "Le nom ne doit contenir que des lettres, des chiffres, des espaces, des apostrophes et des tirets."
      ),
    clientCompany: Yup.string()
      .min(3, "Le nom de l'entreprise doit contenir au moins 3 caractères")
      .max(15, "Le nom de l'entreprise doit contenir au maximum 15 caractères")
      .matches(
        /^[a-zA-ZÀ-ÿ0-9 '-]+$/,
        "Le nom de l'entreprise ne doit contenir que des lettres, des chiffres, des espaces, des apostrophes et des tirets."
      ),
    clientPhone: Yup.string()
      .min(10, "Le numéro doit contenir 10 caractères")
      .max(10, "Le numéro doit contenir 10 caractères")
      .required("Ce champ est requis !")
      .matches(/^[0-9]+$/, "Le numéro ne doit contenir que des chiffres."),
    clientPhone2: Yup.string()
      .min(10, "Le numéro doit contenir 10 caractères")
      .max(10, "Le numéro doit contenir 10 caractères")
      .matches(/^[0-9]+$/, "Le numéro ne doit contenir que des chiffres."),
    clientEmail: Yup.string()
      .required("Ce champ est requis")
      .email("Adresse email invalide")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Adresse email invalide"
      ),
    clientAddress: Yup.string()
      .required("Ce champ est requis")
      .matches(
        /^[a-zA-ZÀ-ÿ0-9 '-]+$/,
        "L'adresse ne doit contenir que des lettres, des chiffres, des espaces, des apostrophes et des tirets."
      ),
    clientDepartment: Yup.string()
      .required("Ce champ est requis")
      .matches(
        /^[a-zA-ZÀ-ÿ0-9 '-]+$/,
        "Le département ne doit contenir que des lettres, des chiffres, des espaces, des apostrophes et des tirets."
      ),
    clientCity: Yup.string()
      .required("Ce champ est requis")
      .matches(
        /^[a-zA-ZÀ-ÿ0-9 '-]+$/,
        "La ville ne doit contenir que des lettres, des chiffres, des espaces, des apostrophes et des tirets."
      ),
  });

  return (
    <>
      {addClient.isDisplayed ? (
        <StyledAddAvailability>
          <Flex className="container">
            <svg
              onClick={() =>
                setAddClient((prevAddClient) => ({
                  ...prevAddClient,
                  isDisplayed: false,
                }))
              }
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="35"
              viewBox="0 0 36 35"
              fill="none"
            >
              <ellipse
                cx="17.7297"
                cy="17.5"
                rx="17.7297"
                ry="17.5"
                fill="#D9D9D9"
              />
              <line
                y1="-0.5"
                x2="17.5953"
                y2="-0.5"
                transform="matrix(0.647698 -0.761897 0.770151 0.637862 12.0562 23.9058)"
                stroke="black"
              />
              <line
                y1="-0.5"
                x2="17.5953"
                y2="-0.5"
                transform="matrix(0.647698 0.761897 -0.770151 0.637862 12.0562 10.5)"
                stroke="black"
              />
            </svg>
            <h3>Ajouter un client</h3>
            <StraightBar />
            <Flex className="inputsColumn">
              <Formik
                initialValues={initialValues}
                onSubmit={postClient}
                validationSchema={validationSchema}
              >
                <Form>
                  <div className="form-group">
                    <label>Nom:* </label>
                    <ErrorMessage name="clientLastName" component="span" />
                    <Field
                      autoComplete="off"
                      name="clientLastName"
                      placeholder="Nom du client..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Prénom:* </label>
                    <ErrorMessage name="clientFirstName" component="span" />
                    <Field
                      autoComplete="off"
                      name="clientFirstName"
                      placeholder="Prénom du client..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Entreprise/Particulier: </label>
                    <ErrorMessage name="clientCompany" component="span" />
                    <Field
                      autoComplete="off"
                      name="clientCompany"
                      placeholder="Entreprise du client, laisser vide si particulier..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Téléphone portable:* </label>
                    <ErrorMessage name="clientPhone" component="span" />
                    <Field
                      autoComplete="off"
                      name="clientPhone"
                      placeholder="Numéro de téléphone portable du client..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Téléphone fixe: </label>
                    <ErrorMessage name="clientPhone2" component="span" />
                    <Field
                      autoComplete="off"
                      name="clientPhone2"
                      placeholder="Numéro de téléphone fixe du client..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Adresse email:* </label>
                    <ErrorMessage name="clientEmail" component="span" />
                    <Field
                      autoComplete="off"
                      name="clientEmail"
                      placeholder="Adresse email du client..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Adresse:* </label>
                    <ErrorMessage name="clientAddress" component="span" />
                    <Field
                      autoComplete="off"
                      name="clientAddress"
                      placeholder="Adresse du client..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Departement:* </label>
                    <ErrorMessage name="clientDepartment" component="span" />
                    <Field
                      autoComplete="off"
                      name="clientDepartment"
                      placeholder="Département du client.."
                    />
                  </div>

                  <div className="form-group">
                    <label>Ville:* </label>
                    <ErrorMessage name="clientCity" component="span" />
                    <Field
                      autoComplete="off"
                      name="clientCity"
                      placeholder="Ville du client..."
                    />
                  </div>

                  <button className="button" type="submit">
                    Ajouter le nouveau client
                  </button>
                </Form>
              </Formik>
            </Flex>
          </Flex>
        </StyledAddAvailability>
      ) : null}
    </>
  );
}

export default AddClient;
