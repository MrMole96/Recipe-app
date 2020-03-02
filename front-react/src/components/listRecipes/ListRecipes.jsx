import React from 'react'
import Recipe from '../recipe/Recipe'
import Grid from '@material-ui/core/Grid';
import RecipeModal from '../recipeModal/RecipeModal'
class ListRecipes extends React.Component {

    state = {
        open: false,
        clickedRecipe: {}
    }

    handleClickOpen = (recipe) => {
        this.setState({
            open: true,
            clickedRecipe: recipe
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    mapToRecipeItem = recipe => {
        return <Recipe
            listOfProducts={recipe.listOfProducts}
            name={recipe.name}
            difficulty={recipe.difficulty}
            numberOfPersons={recipe.numberOfPersons}
            id={recipe._id}
            key={recipe._id}
            deleteRecipe={this.props.deleteRecipe}
            handleClick={()=>this.handleClickOpen(recipe)}
        />
    }

    render() {
        return (
            <div>
                <Grid container style={{ marginTop: '10px' }} spacing={5}>
                    {this.props.recipes.map(this.mapToRecipeItem)}
                </Grid >
                <RecipeModal open={this.state.open} recipe={this.state.clickedRecipe} handleClose={this.handleClose} />
            </div>

        )
    }
}

export default ListRecipes;
