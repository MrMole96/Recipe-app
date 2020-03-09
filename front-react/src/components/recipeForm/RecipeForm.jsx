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

const shortid = require("shortid");

const levels = ["Latwe", "Srednie", "Trudne"];

export const RecipeForm = props => {
  const formik = useFormik({
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
    }),
    onSubmit: (values, { resetForm }) => {
      values._id = shortid.generate();
      props.addRecipeHandler(values);
      resetForm();
    }
  });

  const toDoListHandler = (task, index) => {
    let currentArray = formik.getFieldProps("description").value;
    index === undefined
      ? currentArray.push(task)
      : currentArray.splice(index, 1);
    formik.setFieldValue("description", currentArray);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item sm={12} md={8}>
          <div></div>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <Button variant="contained" color="secondary">
              Wstecz
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<SaveIcon />}
            >
              Dalej
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
