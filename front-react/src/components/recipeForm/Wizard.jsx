import React, { Component } from "react";

import { Formik } from "formik";
import { RecipeFormFirstStep } from "../../components/recipeForm/RecipeFormFirstStep";
import { RecipeFormThirdStep } from "../../components/recipeForm/RecipeFormThirdStep";
import { RecipeFormSecondStep } from "../../components/recipeForm/RecipeFormSecondStep";
import Wiz from "../../container/stepper/Wiz";
import Grid from "@material-ui/core/Grid";
import { RecipeFormFourthStep } from "./RecipeFormFourthStep";
class Wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0
    };
  }

  getPage(component, formik) {
    const { products } = this.props;
    switch (component.formStep) {
      case 0:
        return component.renderPage(formik);
      case 1:
        return component.renderPage({ formik, products });
      case 2:
        return component.renderPage(formik);
      case 3:
        return component.renderPage(formik);
      default:
        break;
    }
  }

  render() {
    const products = this.props.products;
    return (
      <Wiz
        pages={[RecipeFormFirstStep, RecipeFormSecondStep, RecipeFormThirdStep, RecipeFormFourthStep]}
      >
        {wizProps => (
          <Grid container justify="center">
            <Formik
              initialValues={this.props.setUp.initialValues}
              validationSchema={this.props.setUp.validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 1000);
              }}
            >
              {props => {
                const { handleSubmit } = props;
                return (
                  <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    {/* {wizProps.pageIndex === 1
                      ? wizProps.renderPage({ formik, products })
                      : wizProps.renderPage(formik)} */}
                    {this.getPage(wizProps, props)}
                  </form>
                );
              }}
            </Formik>
          </Grid>
        )}
      </Wiz>
    );
  }
}

export default Wizard;
