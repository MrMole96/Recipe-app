import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ToDoList from "../toDoList/ToDoList";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SaveIcon from "@material-ui/icons/Save";
import { RecipeFormFirstStep } from "./RecipeFormFirstStep";
import { RecipeFormSecondStep } from "./RecipeFormSecondStep";
import { RecipeFormThirdStep } from "./RecipeFormThirdStep";
import Wizard from "./Wizard";
import { WizardStep } from "./WizardStep";

const shortid = require("shortid");

const levels = ["Latwe", "Srednie", "Trudne"];

export const RecipeForm = props => {
  const formSetUp = {
    initialValues: {
      name: "",
      difficulty: "",
      numberOfPersons: 0,
      listOfProducts: [],
      description: []
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Zbyt krotka nazwa")
        .required("To pole jest wymagane"),
      difficulty: Yup.string().required("To pole jest wymagane"),
      numberOfPersons: Yup.number()
        .moreThan(0, "Wartosc musi byc wieksza niz 0")
        .required("To pole jest wymagane"),
      listOfProducts: Yup.array().min(3, "Musza byc przynajmniej 3 skladniki"),
      description: Yup.array().min(1, "Musza byc przynajmniej 3 kroki")
    })
  };

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
      style={{ minHeight: "200px" }}
    >
      <Wizard
        setUp={formSetUp}
        products={props.products.data}
      />
    </Grid>
  );
};
