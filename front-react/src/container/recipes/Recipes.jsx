import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import SaveIcon from "@material-ui/icons/Save";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import ToDoList from "../../components/toDoList/ToDoList";
import ListRecipes from "../../components/listRecipes/ListRecipes";
import Snackbar from "@material-ui/core/Snackbar";
import { SnackBarWrapper } from "../../components/snackBarWrapper/SnackBarWrapper";
import { RecipeForm } from "../../components/recipe/RecipeForm";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productsActions";
import { getRecipes, addRecipe } from "../../actions/recipesActions";
const shortid = require("shortid");
const Wrapper = styled.section`
  padding: 2em;
  border: 2px solid #039be5;
  border-radius: 10px;
  width: 100%;
`;

const levels = ["Latwe", "Srednie", "Trudne"];

class recipes extends Component {
  componentDidMount() {
    this.props.dispatch(getProducts());
    this.props.dispatch(getRecipes());
  }

  addRecipe = recipe => {
    console.log(recipe);
    this.props.dispatch(addRecipe(recipe));
  };

  render() {
    return (
      <React.Fragment>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <h2>Formatka do dodawania przepisu</h2>
            <Wrapper>
              <RecipeForm
                addRecipeHandler={this.addRecipe}
                products={this.props.products}
              />
            </Wrapper>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <h2>Lista przepisow</h2>
        {this.props.recipes.downloading ? (
          <div className="loader">
            <CircularProgress size={50} />
          </div>
        ) : (
          <ListRecipes
            recipes={this.props.recipes.data}
            deleteRecipe={this.deleteRecipe}
          />
        )}
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return { products: state.products, recipes: state.recipes };
}

export default connect(mapStateToProps)(recipes);
