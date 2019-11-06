import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Search from '../search/search'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import amber from '@material-ui/core/colors/amber';
import Listrecipes from '../../container/Listrecipes'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#039be5',
    },
    secondary: {
      main: '#43a047',
    },
  },
});
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
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <h2>Recipe mole</h2>
          <Button variant="contained" color="primary">Primary</Button>
          <Button variant="contained" color="secondary">Secondary</Button>
          <Search />
          <Listrecipes />
        </Container>
      </ThemeProvider>
    );
  }

}


export default App;
