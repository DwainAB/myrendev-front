import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { StyledAddAvailability } from "../AddAvailability/styles/AddAvailability.styled";
import { Flex } from "../styles/Flex.styled";
import StraightBar from "../Atomes/StraightBar/StraightBar";
import { StyledFlexRow } from "../styles/FlexRow.styled";
import { useAddFilterContext } from "../../helpers/AddFilterContext";
import { useAuthDataContext } from "../../helpers/AuthDataContext";
import usePostFilter from "./hooks/usePostFilter";

function AddFilter() {
  interface MyFormValues {
    phoneEnterprise: string;
    companyName: string;
    title: string;
    duration: number;
    color: string | null;
  }

  const availableColors = [
    "#F75C03",
    "#5E60CE",
    "#4B4A67",
    "#AFA060",
    "#169873",
  ];
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };
  const [authData, setAuthData] = useAuthDataContext();
  const { postFilter } = usePostFilter();
  const initialValues: MyFormValues = {
    phoneEnterprise: authData.loginData.phoneEnterprise,
    companyName: authData.loginData.companyName,
    title: "",
    duration: 0,
    color: selectedColor,
  };

  const [addFilter, setAddFilter] = useAddFilterContext();

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Ce champ est requis")
      .matches(
        /^[a-zA-Z]{1,15}$/,

        "Le filtre ne doit contenir que 15 lettres maximum"
      ),
    duration: Yup.string()
      .required("Ce champ est requis")
      .matches(
        /^[1-8]$/,
        "La durée ne peut être que de 1 à 8 heures consecutives"
      ),
  });

  useEffect(() => {
    console.log(selectedColor);
    console.log(initialValues.color);
  }, [selectedColor]);

  return (
    <>
      {addFilter.isDisplayed == true ? (
        <StyledAddAvailability>
          <Flex className="container">
            <svg
              onClick={() =>
                setAddFilter((prevAddFilter) => ({
                  ...prevAddFilter,
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
            <h3>Ajouter un filtre</h3>
            <StraightBar />
            <StyledFlexRow className="filtersEditorContainer">
              <Flex className="inputsColumn filtersInputsColumn">
                <Formik<MyFormValues>
                  initialValues={initialValues}
                  onSubmit={(values: MyFormValues) => {
                    const finalValues = {
                      ...values,
                      color: selectedColor,
                    };
                    postFilter(finalValues);
                  }}
                  validationSchema={validationSchema}
                >
                  <Form className="filtersForm">
                    <div className="form-group">
                      <label>Nom du filtre: </label>
                      <ErrorMessage name="title" component="span" />
                      <Field
                        autoComplete="off"
                        name="title"
                        placeholder="Nom du filtre..."
                      />
                    </div>

                    <div className="form-group">
                      <label>Durée: </label>
                      <ErrorMessage name="duration" component="span" />
                      <Field
                        type="number"
                        autoComplete="off"
                        name="duration"
                        placeholder="La durée du filtre..."
                      />
                    </div>

                    <button className="button" type="submit">
                      Ajouter le nouveau filtre
                    </button>
                  </Form>
                </Formik>
              </Flex>
              <Flex className="filtersColorsColumn">
                <span>Couleur:</span>
                <StyledFlexRow className="colors">
                  {availableColors.map((color, index) => (
                    <div
                      key={index}
                      className={`filterColor ${
                        selectedColor === color ? "selectedFilterColor" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorClick(color)}
                    ></div>
                  ))}
                </StyledFlexRow>
              </Flex>
            </StyledFlexRow>
          </Flex>
        </StyledAddAvailability>
      ) : null}
    </>
  );
}

export default AddFilter;
