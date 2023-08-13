import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Flex } from "../../styles/Flex.styled";
import { useAuthPage } from "../../../helpers/AuthPageContext";

function EmailRecover() {
  const [authPage, setAuthPage] = useAuthPage();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Ce champ est requis")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Votre email n'est pas dans le bon format ou contient des caractères interdits !"
      ),
  });
  return (
    <section className="login_container">
      <Flex>
        <Formik
          initialValues={initialValues}
          onSubmit={() => console.log("lol")}
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

            <button className="button" type="submit">
              Envoyer un mail
            </button>
          </Form>
        </Formik>
        <p className="authNavigation">
          Vous recevrez un mail avec un lien pour réinitialiser le mot de passe
          !
        </p>
      </Flex>
    </section>
  );
}

export default EmailRecover;
