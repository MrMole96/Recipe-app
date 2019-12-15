/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import './recipe.css';

const recipe = (props) => (
  <div className="recipe">
    <Grid container spacing={3}>
      <Grid container item spacing={2}>
        <Grid container item sm={6}>
          <Grid item sm={12}><h1>{props.name}</h1></Grid>
          <Grid item sm={6}>{props.difficulty}</Grid>
          <Grid item sm={6}>{props.numberOfPersons}</Grid>
        </Grid>
        <Grid item sm={6}>
          <img alt="ssss" width="260" src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
        </Grid>
      </Grid>
    </Grid>
  </div>
);
export default recipe;
