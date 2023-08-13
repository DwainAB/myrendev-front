import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function PasswordChange() {
  const initialValues = {
    password: "",
    passwordConfirm: "",
  };

  const validationSchema = Yup.object().shape({
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
      <Formik
        initialValues={initialValues}
        onSubmit={() => console.log("lol")}
        validationSchema={validationSchema}
      >
        <Form className="login_container__form">
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
            Créer le nouveau mot de passe
          </button>
        </Form>
      </Formik>
    </section>
  );
}

export default PasswordChange;
