import React from "react";
import ToDoList from "../toDoList/ToDoList";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";

export const RecipeFormThirdStep = props => {
  const toDoListHandler = (task, index) => {
    let currentArray = props.getFieldProps("description").value;
    index === undefined
      ? currentArray.push(task)
      : currentArray.splice(index, 1);
    props.setFieldValue("description", currentArray);
  };

  return (
    <Grid container justify="center" item spacing={3}>
      <ToDoList
        handler={toDoListHandler}
        validation={props}
        description={props.getFieldProps("listOfProducts").value}
      />
      <Grid
        container
        item
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
            // type="submit"
            // startIcon={<SaveIcon />}
            onClick={props.navigateNext}
            disabled={Boolean(props.errors.listOfProducts)}
          >
            Dalej
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
