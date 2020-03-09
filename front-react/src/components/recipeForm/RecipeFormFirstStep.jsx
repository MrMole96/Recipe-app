import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ToDoList from "../toDoList/ToDoList";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SaveIcon from "@material-ui/icons/Save";

const levels = ["Latwe", "Srednie", "Trudne"];

export const RecipeFormFirstStep = ({ formik }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <TextField
          id="name"
          label="Nazwa"
          {...formik.getFieldProps("name")}
          placeholder="Nazwa przepisu"
          margin="normal"
          helperText={formik.touched.name && formik.errors.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          id="difficulty"
          select
          label="Wybierz"
          {...formik.getFieldProps("difficulty")}
          placeholder="Poziom trudnosci przepisu"
          margin="normal"
          style={{ width: "200px" }}
          helperText={formik.touched.difficulty && formik.errors.difficulty}
          error={formik.touched.difficulty && Boolean(formik.errors.difficulty)}
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
      </Grid>
      <Grid item xs={3}>
        <TextField
          id="numberOfPersons"
          type="number"
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
      </Grid>
    </Grid>
  );
};
