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

const levels = ["Latwe", "Srednie", "Trudne"];

export const RecipeForm = props => {
  const formik = useFormik({
    initialValues: {
      name: "",
      difficulty: "",
      numberOfPersons: 0,
      productsInRecipe: [],
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
      productsInRecipe: Yup.array()
        .required("To pole jest wymagane")
        .min(3, "Musza byc przynajmniej 3 skladniki"),
      description: Yup.array().required("To pole jest wymagane")
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("submit");
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item sm={12} md={4}>
          <div>
            <TextField
              id="name"
              label="Nazwa"
              {...formik.getFieldProps("name")}
              placeholder="Nazwa przepisu"
              margin="normal"
              helperText={formik.touched.name && formik.errors.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
          </div>
          <div>
            <TextField
              id="difficulty"
              select
              label="Wybierz"
              {...formik.getFieldProps("difficulty")}
              placeholder="Poziom trudnosci przepisu"
              margin="normal"
              style={{ width: "200px" }}
              helperText={formik.touched.difficulty && formik.errors.difficulty}
              error={
                formik.touched.difficulty && Boolean(formik.errors.difficulty)
              }
            >
              {levels.map((option, index) => (
                <MenuItem
                  key={index}
                  style={{ display: "block", paddingLeft: "10px" }}
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              id="numberOfPersons"
              label="Ilosc osob"
              {...formik.getFieldProps("numberOfPersons")}
              className="input"
              placeholder="Szacunkowa ilosc osob na danie"
              margin="normal"
              helperText={
                formik.touched.numberOfPersons && formik.errors.numberOfPersons
              }
              error={
                formik.touched.numberOfPersons &&
                Boolean(formik.errors.numberOfPersons)
              }
            />
          </div>
        </Grid>
        <Grid item sm={12} md={8}>
          <div>
            <Autocomplete
              multiple
              options={props.products.data}
              getOptionLabel={option => option.name}
              filterSelectedOptions
            //   {...formik.getFieldProps("productsInRecipe")}
              onChange={e => formik.setFieldValue("productsInRecipe", e.target.value)}
              onSelect={val => formik.setFieldValue("productsInRecipe", val)}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Wybierz produkty do przepisu"
                  placeholder="Produkt"
                  margin="normal"
                  fullWidth
                  helperText={
                    formik.touched.productsInRecipe &&
                    formik.errors.productsInRecipe
                  }
                  error={
                    formik.touched.productsInRecipe &&
                    Boolean(formik.errors.productsInRecipe)
                  }
                />
              )}
            />
          </div>
          {/* <ToDoList
            handler={this.toDoListHandler}
            description={this.state.recipesForm.description}
            deleteTaskHandler={this.deleteTaskHandler}
            errorHandler={this.state.validationForm.description.length != 0}
            errorText={this.state.validationForm.description}
          /> */}
        </Grid>
        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={8} style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<SaveIcon />}
            >
              Zapisz
            </Button>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Grid>
    </form>
  );
};
