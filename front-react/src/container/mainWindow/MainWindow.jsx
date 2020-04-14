import React, { Component } from "react";
import Search from "../search/Search";
import Listrecipes from "../../components/listRecipes/ListRecipes";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import { SnackBarWrapper } from "../../components/snackBarWrapper/SnackBarWrapper";

import { connect } from "react-redux";
import { getRecipes } from "../../actions/recipesActions";
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
    var that = this;
    axios
      .delete("http://localhost:9000/Recipes", { params: { id: recipeId } })
      .then((response) => {
        this.setState({
          open: true,
          snackMessage: response.data,
          snackVariant: "success",
        });
      })
      .catch(function(err) {
        that.setState({
          open: true,
          snackMessage: err,
          snackVariant: "error",
        });
      });
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
