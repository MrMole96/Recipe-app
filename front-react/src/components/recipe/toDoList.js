import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Task from './task'
import './toDoList.css'
export default class toDoList extends Component {


  state = {
    task: ''
  }
  inputHandler = event => {
    this.setState({ task: event.target.value })
  }

  render() {

    let listOfProducts = this.props.description.map((task, index) => {
      return <Task index={index} description={task} deleteHandler={this.props.deleteTaskHandler}/>
    })

    return (
      //onChange -> onclick?
      <div >
        <TextField
          id="description"
          label="Opis"
          multiline
          onChange={(value) => this.inputHandler(value)}
          helperText="Opis etapu"
          margin="normal"
          placeholder
          value={this.state.task}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                >
                  <AddIcon
                    onClick={() => { this.props.handler(this.state.task); this.setState({ task: '' }) }}
                  />
                </IconButton>
              </InputAdornment>
            )
          }}

        />
        <ul className="toDoList">
          {listOfProducts}
        </ul>

      </div>
    )
  }
}
