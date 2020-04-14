import React from "react";
import Recipe from "../recipe/Recipe";
import Grid from "@material-ui/core/Grid";
import RecipeModal from "../recipeModal/RecipeModal";
import RecipePlaceHolder from "../../components/recipePlaceHolder/recipePlaceHolder";
class ListRecipes extends React.Component {
  state = {
    open: false,
    clickedRecipe: {},
  };

  handleClickOpen = (recipe) => {
    this.setState({
      open: true,
      clickedRecipe: recipe,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  mapToRecipeItem = (recipe) => {
    return (
      <Recipe
        listOfProducts={recipe.listOfProducts}
        name={recipe.name}
        difficulty={recipe.difficulty}
        numberOfPersons={recipe.numberOfPersons}
        id={recipe._id}
        key={recipe._id}
        deleteRecipe={this.props.deleteRecipe}
        handleClick={() => this.handleClickOpen(recipe)}
      />
    );
  };

  placeholderSet = () => {
    let placeholders = [];
    for (let i = 0; i < 6; i++) {
      placeholders.push(<RecipePlaceHolder key={i} />);
    }
    return placeholders;
  };

  render() {
    console.log("isDownloading", this.props.isDownloading);
    return (
      <div>
        <Grid container style={{ marginTop: "10px" }} spacing={5}>
          {this.props.isDownloading && this.placeholderSet()}
          {this.props.recipes.map(this.mapToRecipeItem)}
        </Grid>
        <RecipeModal
          open={this.state.open}
          recipe={this.state.clickedRecipe}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}

export default ListRecipes;
