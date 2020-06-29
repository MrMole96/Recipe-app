import React from "react";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useEffect, useDispatch, useSelector } from "react-redux";
import List from "@material-ui/core/List";
import Task from "../task/Task";
import CircularProgress from "@material-ui/core/CircularProgress";
import SaveIcon from "@material-ui/icons/Save";
import { addRecipe } from "../../actions/recipesActions";
import { useHistory } from "react-router-dom";
import "./RecipeForm.css";

export const RecipeFormFourthStep = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const downloading = useSelector((state) => state.recipes.downloading);

  const {
    name,
    difficulty,
    numberOfPersons,
    listOfProducts,
    description,
  } = props.values;
  listOfProducts.reduce((acc, obj) => {
    return acc + obj.calories;
  }, 0);

  const descriptionToRender = description.map((task, index) => {
    return <Task key={index} index={index} description={task} showImg />;
  });

  console.log("downloading", downloading);

  return downloading ? (
    <div className="loader">
      <CircularProgress size={50} />
    </div>
  ) : (
    <Grid container justify="center" item spacing={3}>
      <Grid item>
        <h2>{name}</h2>
      </Grid>
      <Grid item container>
        <Grid item container justify="center" xs={12} sm={6}>
          <img src="https://via.placeholder.com/300" width="300" />
          {/* Zdjecie finalne i lista produktow */}
        </Grid>
        <Grid item container xs={12} sm={6}>
          <Grid item container spacing={0} justify="space-around">
            <Grid item>
              <div className="summary-header">
                <p>
                  Stopien trudnosci: <b>{difficulty}</b>
                </p>
              </div>
            </Grid>
            <Grid item>
              <div className="summary-header">
                <p>
                  Ilosc porcji: <b>{numberOfPersons}</b>
                </p>
              </div>
            </Grid>
            <Grid item>
              <div className="summary-header">
                <p>
                  Szacowana ilosc kalorii:
                  <b>
                    {" "}
                    {listOfProducts.reduce((acc, obj) => acc + obj.calories, 0)}
                  </b>
                </p>
              </div>
            </Grid>
          </Grid>
          <Grid item>
            <ul className="list-of-products">
              {listOfProducts.map((x, i) => (
                <li key={i}>
                  {x.name} {x.quantity}
                  {x.unit}
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container>
        <List style={{ width: "100%" }} dense>
          {descriptionToRender}
        </List>
      </Grid>
      <Grid
        container
        item
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={props.navigateBack}
            disabled={props.formStep === 0}
          >
            Wstecz
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color=""
            type="submit"
            startIcon={<SaveIcon />}
            onClick={() => {
              dispatch(addRecipe(props.values));
              history.push("/");
            }}
          >
            Zapisz
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
