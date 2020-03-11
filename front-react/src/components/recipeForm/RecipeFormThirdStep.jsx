import React from "react";
import ToDoList from "../toDoList/ToDoList";

export const RecipeFormThirdStep = props => {
  console.log(props)
  const toDoListHandler = (task, index) => {
    let currentArray = props.getFieldProps("description").value;
    index === undefined
      ? currentArray.push(task)
      : currentArray.splice(index, 1);
    props.setFieldValue("description", currentArray);
  };
  return (
    <ToDoList
      handler={toDoListHandler}
      validation={props}
      description={props.getFieldProps("listOfProducts").value}
    />
  );
};
