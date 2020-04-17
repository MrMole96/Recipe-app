import React from "react";
import Recipe from "../recipe/Recipe";
import Grid from "@material-ui/core/Grid";
import RecipeModal from "../recipeModal/RecipeModal";
import RecipePlaceHolder from "../../components/recipePlaceHolder/recipePlaceHolder";
import { Spring, Transition, Trail } from "react-spring/renderprops";
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
    return (
      <span>
        <Grid container style={{ marginTop: "10px" }} spacing={5}>
          {this.props.isDownloading && (
            <Trail
              items={this.placeholderSet()}
              keys={(item) => item.key}
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}              
            >
              {(item) => (props) => (
                <Grid container style={props} item sm={12} md={6}>
                  {item}
                </Grid>
              )}
            </Trail>
          )}
          {!this.props.isDownloading && (
            <Transition
              items={this.props.recipes.map(this.mapToRecipeItem)}
              keys={(item) => item.key}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0 }}
            >
              {(item) => (props) => (
                <Grid container style={props} item sm={12} md={6}>
                  {item}
                </Grid>
              )}
            </Transition>
          )}
        </Grid>
        <RecipeModal
          open={this.state.open}
          recipe={this.state.clickedRecipe}
          handleClose={this.handleClose}
        />
      </span>
    );
  }
}

export default ListRecipes;
