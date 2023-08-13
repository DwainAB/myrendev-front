import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Flex } from "../../styles/Flex.styled";
import { useAuthDataContext } from "../../../helpers/AuthDataContext";
import useLogin from "../hooks/useLogin";
import { useAuthPage } from "../../../helpers/AuthPageContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [authPage, setAuthPage] = useAuthPage();
  const [authData, setAuthData] = useAuthDataContext();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

  const { onSubmit } = useLogin();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Ce champ est requis")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Votre email n'est pas dans le bon format ou contient des caractères interdits !"
      ),
    password: Yup.string()
      .min(8, "Votre mot de passe doit faire au moins 8 caractères.")
      .max(20, "Votre mot de passe doit faire au maximum 20 caractères.")
      .required("Ce champ est requis")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, un chiffre et un caractère spécial."
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

            <label>Mot de passe: </label>
            <ErrorMessage name="password" component="span" />
            <Field
              autoComplete="off"
              type="password"
              name="password"
              placeholder="Votre mot de passe..."
            />
            <p
              onClick={() =>
                setAuthPage((prevAuthPage) => ({
                  ...prevAuthPage,
                  loginPage: 3,
                }))
              }
              className="authNavigation"
            >
              Mot de passe oublié ? Cliquez-ici !
            </p>

            <button className="button" type="submit">
              Se connecter
            </button>
          </Form>
        </Formik>
        <p
          onClick={() =>
            setAuthPage((prevAuthPage) => ({ ...prevAuthPage, loginPage: 2 }))
          }
          className="authNavigation"
        >
          Vous n'avez pas encore de compte ? Créez-en un juste là !
        </p>
      </Flex>
    </section>
  );
}

export default Login;
