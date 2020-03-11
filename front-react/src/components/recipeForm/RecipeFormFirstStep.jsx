import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ToDoList from "../toDoList/ToDoList";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SaveIcon from "@material-ui/icons/Save";

const levels = ["Latwe", "Srednie", "Trudne"];

export const RecipeFormFirstStep = props => {
  console.log("props", props);
  return (
    <Grid container justify="center" item spacing={3}>
      <Grid item xs={4}>
        <TextField
          id="name"
          label="Nazwa"
          name="name"
          {...props.getFieldProps("name")}
          placeholder="Nazwa przepisu"
          margin="normal"
          helperText={props.touched.name && props.errors.name}
          error={props.touched.name && Boolean(props.errors.name)}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="difficulty"
          name="difficulty"
          select
          label="Wybierz"
          {...props.getFieldProps("difficulty")}
          placeholder="Poziom trudnosci przepisu"
          margin="normal"
          style={{ width: "200px" }}
          helperText={props.touched.difficulty && props.errors.difficulty}
          error={props.touched.difficulty && Boolean(props.errors.difficulty)}
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
      <Grid item xs={4}>
        <TextField
          id="numberOfPersons"
          name="numberOfPersons"
          type="number"
          label="Ilosc osob"
          {...props.getFieldProps("numberOfPersons")}
          className="input"
          placeholder="Szacunkowa ilosc osob na danie"
          margin="normal"
          helperText={
            props.touched.numberOfPersons && props.errors.numberOfPersons
          }
          error={
            props.touched.numberOfPersons &&
            Boolean(props.errors.numberOfPersons)
          }
        />
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={props.navigateBack}
            disabled={props.formStep === 0}
          >
            Wstecz
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
             type="submit"
            // startIcon={<SaveIcon />}
            onClick={props.navigateNext}
            disabled={props.errors.name || props.errors.numberOfPersons || props.errors.difficulty}
          >
            Dalej
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
