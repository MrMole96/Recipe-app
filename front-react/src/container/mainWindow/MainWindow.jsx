import React, { Component } from "react";
import Search from "../search/Search";
import Listrecipes from "../../components/listRecipes/ListRecipes";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import { SnackBarWrapper } from "../../components/snackBarWrapper/SnackBarWrapper";

import { connect } from "react-redux";
import { getRecipes, deleteRecipe } from "../../actions/recipesActions";
export class MainWindow extends Component {
  state = {
    recipes: [],
    open: false,
    snackMessage: "",
    snackVariant: "",
  };
  getRecipesHandler = (products) => {
    this.props.dispatch(getRecipes(products));
  };

  deleteRecipe = (recipeId) => {
    this.props.dispatch(deleteRecipe(recipeId));
  };

  render() {
    return (
      <div>
        <Search getRecipes={this.getRecipesHandler} />
        <Listrecipes
          recipes={this.props.recipes.data}
          deleteRecipe={this.deleteRecipe}
          isDownloading={this.props.recipes.downloading}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { recipes: state.recipes };
}

export default connect(mapStateToProps)(MainWindow);
