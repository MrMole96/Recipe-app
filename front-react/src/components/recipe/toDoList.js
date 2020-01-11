import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import InputAdornment from '@material-ui/core/InputAdornment';
import Task from './task'
import List from '@material-ui/core/List';


import './toDoList.css'
export default class toDoList extends Component {


  state = {
    task: '',
    image: null
  }
  inputHandler = event => {
    this.setState({ task: event.target.value })
  }

  uploadFile = event => {
    console.log(event.target.value)
  }

  render() {
    let listOfProducts = this.props.description.map((task, index) => {
      return <Task key={task._id} index={index} description={task} deleteHandler={this.props.deleteTaskHandler} />
    })

    return (
      <div >
        <TextField
          id="description"
          label="Opis"
          multiline
          onChange={(value) => this.inputHandler(value)}
          placeholder="Dodaj etap w przepisie"
          helperText={this.props.errorText}
          error={this.props.errorHandler}
          margin="normal"
          value={this.state.task}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => { this.props.handler(this.state.task); this.setState({ task: '' }) }}
                >
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => this.fileUpload.click()}>
                  <ImageIcon />
                </IconButton>
                <input type="file" ref={(fileUpload) => {
                  this.fileUpload = fileUpload;
                }}
                  style={{ visibility: 'hidden' }} onChange={this.uploadFile} />
              </InputAdornment>
            )
          }}
        />
        <List dense>
          {listOfProducts}
        </List>
      </div>
    )
  }
}

