import React, { Component } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Search from '../search/search'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Listrecipes from '../../container/Listrecipes'
import Products from '../product/products'
import Recipes from '../recipe/recipes'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navigation from '../navigation/navigation'

import { StylesProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0984e3',
      light: '#24A0FF',
      dark: '#035796'
    },
    secondary: {
      main: '#965A00',
      light: '#E38C09',


    }
  },
});
class App extends Component {

  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Navigation />
          <Container maxWidth="lg">
            <Switch>
              <Route path="/products">
                <StylesProvider injectFirst>
                  <Products />
                </StylesProvider>
              </Route>
              <Route path="/recipes">
                <StylesProvider injectFirst>
                  <Recipes />
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
