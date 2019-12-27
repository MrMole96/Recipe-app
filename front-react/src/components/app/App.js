import React, { Component } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Products from '../product/products'
import Recipes from '../recipe/recipes'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navigation from '../navigation/navigation'

import { StylesProvider } from '@material-ui/core/styles';
import MainWindow from '../../container/MainWindow';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0984e3',
      light: '#24A0FF',
      dark: '#035796'
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
                <StylesProvider>
                  <Products />
                </StylesProvider>
              </Route>
              <Route path="/recipes">
                <StylesProvider>
                  <Recipes />
                </StylesProvider>
              </Route>
              <Route exact path="/">               
              <MainWindow/>
              </Route>
            </Switch>
          </Container>
        </ThemeProvider>
      </Router >
    );
  }

}


export default App;
