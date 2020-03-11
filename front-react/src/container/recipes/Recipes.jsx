import React, { Component } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import ListRecipes from "../../components/listRecipes/ListRecipes";
import { RecipeForm } from "../../components/recipeForm/RecipeForm";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productsActions";
import {
  getRecipes,
  addRecipe,
  deleteRecipe
} from "../../actions/recipesActions";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { Container, Box } from "@material-ui/core";

const Wrapper = styled.div`
  padding: 25px;
  border: 2px solid #039be5;
  border-radius: 25px;
  min-width: 350px;
`;

const steps = ["Podstawowe informacje", "Szczegoly", "Opis"];

class recipes extends Component {
  state = {
    step: 0
  };

  componentDidMount() {
    this.props.dispatch(getProducts());
    this.props.dispatch(getRecipes());
  }

  nextStep = () => {
    this.setState(state => ({ step: state.step + 1 }));
  };

  previousStep = () => {
    this.setState(state => ({ step: state.step - 1 }));
  };

  addRecipe = recipe => {
    this.props.dispatch(addRecipe(recipe));
  };
  deleteRecipe = recipeId => {
    console.log(recipeId);
    this.props.dispatch(deleteRecipe(recipeId));
  };

  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        justify="center"
        style={{ minHeight: "85vh" }}
      >
        <Grid item>
          <div style={{ textAlign: "center" }}>
            <h2>Dodawanie przepisu</h2>
            <Wrapper>
              <Stepper alternativeLabel activeStep={this.state.step}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <RecipeForm
                nextStep={this.nextStep}
                previousStep={this.previousStep}
                currentStep={this.state.step}
                addRecipeHandler={this.addRecipe}
                products={this.props.products}
              />
            </Wrapper>
          </div>
        </Grid>
      </Grid>
    );
  }
}
function mapStateToProps(state) {
  return { products: state.products, recipes: state.recipes };
}

export default connect(mapStateToProps)(recipes);
