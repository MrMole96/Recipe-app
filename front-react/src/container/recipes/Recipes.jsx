import React, { Component } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import ListRecipes from "../../components/listRecipes/ListRecipes";
import { RecipeForm } from "../../components/recipe/RecipeForm";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productsActions";
import {
  getRecipes,
  addRecipe,
  deleteRecipe
} from "../../actions/recipesActions";
const Wrapper = styled.section`
  padding: 2em;
  border: 2px solid #039be5;
  border-radius: 10px;
  width: 100%;
`;

class recipes extends Component {
  componentDidMount() {
    this.props.dispatch(getProducts());
    this.props.dispatch(getRecipes());
  }

  addRecipe = recipe => {
    this.props.dispatch(addRecipe(recipe));
  };
  deleteRecipe = recipeId => {
    console.log(recipeId)
    this.props.dispatch(deleteRecipe(recipeId));
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
