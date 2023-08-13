import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Flex } from "../../styles/Flex.styled";
import { useAuthPage } from "../../../helpers/AuthPageContext";
import useRegister from "../hooks/useRegister";

function Register() {
  const { onSubmit } = useRegister();
  const [authPage, setAuthPage] = useAuthPage();
  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    enterpriseName: "",
    phoneEnterprise: "",
    password: "",
    passwordConfirm: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Ce champ est requis")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Votre email n'est pas dans le bon format ou contient des caractères interdits !"
      ),
    firstName: Yup.string()
      .min(3, "Le prénom doit contenir au moins 3 caractères")
      .max(15, "Le prénom doit contenir au maximum 15 caractères")
      .required("Ce champ est requis !")
      .matches(
        /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        "Le prénom ne doit contenir aucun caractère spécial."
      ),
    lastName: Yup.string()
      .min(3, "Le nom doit contenir au moins 3 caractères")
      .max(15, "Le nom doit contenir au maximum 15 caractères")
      .required("Ce champ est requis !")
      .matches(
        /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        "Le nom ne doit contenir aucun caractère spécial."
      ),
    enterpriseName: Yup.string()
      .min(3, "Le nom de l'entreprise doit contenir au moins 3 caractères")
      .max(15, "Le nom de l'entreprise doit contenir au maximum 15 caractères")
      .required("Ce champ est requis !")
      .matches(
        /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        "Le nom de l'entreprise ne doit contenir aucun caractère spécial."
      ),
    phoneEnterprise: Yup.string()
      .min(10, "Le numéro doit contenir 10 caractères")
      .max(10, "Le numéro doit contenir 10 caractères")
      .required("Ce champ est requis !")
      .matches(
        /^(?=[a-zA-Z0-9._]{10}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        "Le numéro ne doit contenir aucun caractère spécial."
      ),
    password: Yup.string()
      .min(8, "Votre mot de passe doit faire au moins 8 caractères.")
      .max(20, "Votre mot de passe doit faire au maximum 20 caractères.")
      .required("Ce champ est requis")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, un chiffre et un caractère spécial."
      ),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Les mots de passe doivent correspondre"
    ),
  });
  return (
    <section className="login_container">
      <Flex>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="login_container__form">
            <label>Adresse email: </label>
            <ErrorMessage name="email" component="span" />
            <Field
              autoComplete="off"
              name="email"
              placeholder="exemple@gmail.com"
            />

            <label>Prénom: </label>
            <ErrorMessage name="firstName" component="span" />
            <Field
              autoComplete="off"
              name="firstName"
              placeholder="Votre prénom..."
            />

            <label>Nom: </label>
            <ErrorMessage name="lastName" component="span" />
            <Field
              autoComplete="off"
              name="lastName"
              placeholder="Votre nom..."
            />

            <label>Nom de l'entreprise: </label>
            <ErrorMessage name="enterpriseName" component="span" />
            <Field
              autoComplete="off"
              name="enterpriseName"
              placeholder="le nom de l'entreprise..."
            />

            <label>Téléphone de l'entreprise: </label>
            <ErrorMessage name="phoneEnterprise" component="span" />
            <Field
              autoComplete="off"
              name="phoneEnterprise"
              placeholder="le téléphone de l'entreprise..."
            />

            <label>Mot de passe: </label>
            <ErrorMessage name="password" component="span" />
            <Field
              autoComplete="off"
              type="password"
              name="password"
              placeholder="Votre mot de passe..."
            />

            <label>Confirmer le mot de passe: </label>
            <ErrorMessage name="passwordConfirm" component="span" />
            <Field
              autoComplete="off"
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="Votre mot de passe..."
            />

            <button className="button" type="submit">
              S'inscrire
            </button>
          </Form>
        </Formik>
        <p
          onClick={() =>
            setAuthPage((prevAuthPage) => ({ ...prevAuthPage, loginPage: 1 }))
          }
          className="authNavigation"
        >
          Vous avez déjà un compte ? Alors connectez-vous !
        </p>
      </Flex>
    </section>
  );
}

export default Register;
