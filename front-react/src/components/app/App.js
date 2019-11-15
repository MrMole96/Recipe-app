import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import Search from '../search/search'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import amber from '@material-ui/core/colors/amber';
import Listrecipes from '../../container/Listrecipes'
import Products from '../product/products'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navigation from '../navigation/navigation'
import axios from 'axios';
import { width } from '@material-ui/system';

import { StylesProvider } from '@material-ui/core/styles';

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
    products: 'aopppppp',
    productForm: {
      name: '',
      amount: 0,
      calories: 0,
      unit: ''
    }
  };

  handleChange = (event) => {
    console.log(event);
    this.setState({ testInput: event.target.value })
  }

  inputHandler = (event) => {
    const productForm = {
      ...this.state.productForm,
      [event.target.id]: event.target.value,
    }

    this.setState({ productForm: productForm })

  }
  inputSelectHandler = (event) => {
    const productForm = {
      ...this.state.productForm,
      unit: event.target.value,
    }
    this.setState({ productForm: productForm })
  }
  sendForm = () => {
    console.log('wysylam');
    axios.post('http://localhost:9000/Products', this.state.productForm)
      .then(response => {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Navigation />
          <Container maxWidth="sm">
            <h1>Swiat przepisow</h1>
            <Switch>
              <Route path="/products">
                <StylesProvider injectFirst>
                  <Products
                    formHandler={this.inputHandler}
                    formSelectHandler={this.inputSelectHandler}
                    unit={this.state.productForm.unit}
                    sendForm={this.sendForm} />
                </StylesProvider>
              </Route>
              <Route exact path="/">
                <Search />
                <Listrecipes />
              </Route>
            </Switch>
          </Container>
        </ThemeProvider>
      </Router >
    );
  }

}


export default App;
