import React from "react";
import toDoList from "../toDoList/ToDoList";

export const RecipeFormThirdStep = ({ formik, toDoListHandler }) => {
  return (
    <toDoList
      handler={toDoListHandler}
      validation={formik}
      description={formik.getFieldProps("listOfProducts").value}
    />
  );
};
