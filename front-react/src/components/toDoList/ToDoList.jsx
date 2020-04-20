import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import ImageIcon from "@material-ui/icons/Image";
import InputAdornment from "@material-ui/core/InputAdornment";
import Task from "../task/Task";
import List from "@material-ui/core/List";
import { Grid } from "@material-ui/core";

import "./ToDoList.css";
import { TaskModal } from "../taskModal/TaskModal";
export default class toDoList extends Component {
  state = {
    text: "",
    image: null,
    open: false,
    clickedTask: null,
  };

  inputHandler = (event) => {
    this.setState({ text: event.target.value });
  };

  addTasksHandler = () => {
    let { text, image } = this.state;
    this.props.handler({ text: text, image: image });
  };

  uploadFile = () => {
    let file = this.fileUpload.files[0];
    this.toBase64(file).then((result) => {
      this.setState({ image: result });
    });
  };

  showTaskHandler = (task) => {
    this.setState({ clickedTask: task, open: true });
  };

  toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  render() {
    let listOfProducts = null;
    if (this.props.validation.values.description) {
      listOfProducts = this.props.validation.values.description.map(
        (task, index) => {
          return (
            <Task
              key={index}
              index={index}
              description={task}
              showTaskHandler={this.showTaskHandler}
              deleteHandler={this.props.handler}
            />
          );
        }
      );
    }
    let { onBlur, value } = this.props.validation.getFieldProps("description");
    let { clickedTask, open } = this.state;
    console.log(this.props.handler);
    return (
      <Grid container item justify="space-between" direction="column">
        <Grid item>
          {this.props.handler && (
            <TextField
              id="description"
              label="Opis"
              multiline
              onBlur={onBlur}
              onChange={(value) => this.inputHandler(value)}
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
              value={this.state.text}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        this.addTasksHandler();
                        this.setState({ text: "", image: null });
                      }}
                      disabled={
                        this.state.text && this.state.image ? false : true
                      }
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
                      ref={(fileUpload) => {
                        this.fileUpload = fileUpload;
                      }}
                      style={{ visibility: "hidden" }}
                      onChange={this.uploadFile}
                    />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Grid>
        <Grid item style={{marginBottom:"25px"}}>
          <List dense>{listOfProducts}</List>
        </Grid>
        {this.state.open && (
          <TaskModal
            open={open}
            index={value.indexOf(clickedTask) + 1}
            description={clickedTask.text}
            image={clickedTask.image}
            handleClose={() => this.setState({ open: false })}
          />
        )}
      </Grid>
    );
  }
}
