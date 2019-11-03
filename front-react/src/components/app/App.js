import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import './App.css';

import Container from '@material-ui/core/Container';
import Search from '../search/search'

class App extends Component {

  state = {
    products: 'aopppppp'
};

  handleChange = (event) => {
    console.log(event);
    this.setState({ testInput: event.target.value })
  }

  render() {
    return (
      <Container maxWidth="sm">
        <h2>Recipe mole</h2>
        <p>App state {this.state.products}</p>
        
        <Search />
      </Container>
    );
  }

}

export default App;
