/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import './Recipe.css';

const recipe = (props) => (

  <Grid  container item sm={12} md={6}>
    <Grid container item className="recipe" onClick={props.handleClick}>    
      <Grid container item spacing={2} >
        <Grid container item sm={6}>
          <Grid item sm={12}><h1>{props.name}</h1></Grid>
          <Grid item sm={6}>Poziom trudnosci: {props.difficulty}</Grid>
          <Grid item sm={6}>Szacunkowa ilosc osob: {props.numberOfPersons}</Grid>
        </Grid>
        <Grid item sm={6}>  
        <IconButton className="button__delete" aria-label="delete" onClick={()=>props.deleteRecipe(props.id)} style={{borderRadius:'50%'}}>
                <HighlightOffOutlinedIcon color="secondary" style={{ fontSize: 30 }} />
            </IconButton>      
          <img alt="ssss" width="260" src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
        </Grid>
      </Grid>
      <Grid className='productList' style={{ marginTop: '10px' }}>
        {props.listOfProducts.map(product => {
          return (
            <Chip
              key={product._id}
              label={product.name}
              color="primary"
              variant="outlined"
              style={{ margin: '5px' }}
            />
          );
        })}
      </Grid>
    </Grid>
  </Grid>
);
export default recipe;
