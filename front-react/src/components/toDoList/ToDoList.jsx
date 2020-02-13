import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import ImageIcon from "@material-ui/icons/Image";
import InputAdornment from "@material-ui/core/InputAdornment";
import Task from "../task/Task";
import List from "@material-ui/core/List";

import "./ToDoList.css";
export default class toDoList extends Component {
  state = {
    tasks: [],
    task: "",
    image: ""
  };

  inputHandler = event => {
    this.setState({ task: event.target.value });
  };

  tasksHandler = task => {
    let array = this.state.tasks;
    array.push(task);
    console.log(array);
    this.setState({ tasks: array }, () => this.props.handler(array));
  };

  uploadFile = () => {
    let file = this.fileUpload.files[0];
    this.toBase64(file).then(result => {
      this.setState({ image: result });
    });
  };

  toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  render() {
    let listOfProducts = null;
    if (this.props.description) {
      listOfProducts = this.props.description.map((task, index) => {
        return (
          <Task
            key={task._id}
            index={index}
            description={task}
            deleteHandler={this.props.deleteTaskHandler}
          />
        );
      });
    }
    let {
      onChange,
      handleChange,
      onBlur,
      handleBlur
    } = this.props.validation.getFieldProps("description");
    return (
      <div>
        <TextField
          id="description"
          label="Opis"
          multiline
          onBlur={onBlur}
          onChange={value => this.inputHandler(value)}
          placeholder="Dodaj etap w przepisie"
          helperText={
            this.props.validation.touched.description &&
            this.props.validation.errors.description
          }
          error={
            this.props.validation.touched.description &&
            Boolean(this.props.validation.errors.description)
          }
          margin="normal"
          value={this.state.task}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    this.tasksHandler(this.state.task);
                    this.setState({ task: "", image: {} });
                  }}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  color={this.state.image ? "primary" : "secondary"}
                  onClick={() => this.fileUpload.click()}
                >
                  <ImageIcon />
                </IconButton>
                <input
                  type="file"
                  ref={fileUpload => {
                    this.fileUpload = fileUpload;
                  }}
                  style={{ visibility: "hidden" }}
                  onChange={this.uploadFile}
                />
              </InputAdornment>
            )
          }}
        />
        <List dense>{listOfProducts}</List>
      </div>
    );
  }
}
