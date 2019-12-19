import React from 'react'
import Recipe from './recipe'
import Grid from '@material-ui/core/Grid';
class ListRecipes extends React.Component {

    mapToRecipeItem = recipe => {

        return <Recipe
            listOfProducts={recipe.listOfProducts}
            name={recipe.name}
            difficulty={recipe.difficulty}
            numberOfPersons={recipe.numberOfPersons}
            id={recipe._id}
            key={recipe._id}
        // deleteRecipe={that.deleteRecipe}
        />


    }

    render() {
        return (
            <Grid container spacing={5}>
                {this.props.recipes.map(this.mapToRecipeItem)}
            </Grid >
        )
    }
}

export default ListRecipes;
