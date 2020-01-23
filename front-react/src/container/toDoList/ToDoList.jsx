import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import InputAdornment from '@material-ui/core/InputAdornment';
import Task from '../../components/task/Task'
import List from '@material-ui/core/List';


import './ToDoList.css'
export default class toDoList extends Component {


  state = {
    task: '',
    image: ''
  }

  inputHandler = event => {
    this.setState({ task: event.target.value })
  }

  uploadFile = () => {
    let file = this.fileUpload.files[0]
    this.toBase64(file).then(result => {
      this.setState({ image: result })
    })
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  render() {
    let listOfProducts = this.props.description.map((task, index) => {
      console.log('TASK',task)
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
                  onClick={() => { this.props.handler(this.state); this.setState({ task: '', image: {} }) }}
                >
                  <AddIcon />
                </IconButton>
                <IconButton color={this.state.image? 'primary' : 'secondary'} onClick={() => this.fileUpload.click()}>
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

