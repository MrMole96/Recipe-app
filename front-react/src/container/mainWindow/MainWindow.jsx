import React, { Component } from 'react'
import Search from '../search/Search'
import Listrecipes from '../../components/listRecipes/ListRecipes'
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackBarWrapper } from '../../components/snackBarWrapper/SnackBarWrapper'
export class MainWindow extends Component {

    state = {
        recipes: [],
        open: false,
        snackMessage: '',
        snackVariant: ''
    }
    getRecipesHandler = (products) => {
        console.log(products)
        let that = this;
        axios.post('http://localhost:9000/Recipes/byProducts', {
            products: products
        })
            .then(function (response) {
                console.log(response.data)
                that.setState({ recipes: response.data })
            })
            .catch(function (err) {
                console.log(err);
                that.setState({
                    open: true,
                    snackMessage: 'Nie udalo sie',
                    snackVariant: 'error'
                })
            })
    }

    deleteRecipe = (recipeId) => {
        var that = this;
        axios.delete('http://localhost:9000/Recipes', { params: { id: recipeId } })
            .then(response => {
                console.log(response);
                this.setState({
                    open: true,
                    snackMessage: response.data,
                    snackVariant: 'success'
                })
            })
            .catch(function (err) {
                console.log(err);
                that.setState({
                    open: true,
                    snackMessage: err,
                    snackVariant: 'error'
                })
            })
    }

    render() {
        return (
            <div>
                <Snackbar
                    open={this.state.open}
                    onClose={() => this.setState({ open: false })}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                // autoHideDuration={6000}
                >
                    <SnackBarWrapper
                        variant={this.state.snackVariant}
                        message={this.state.snackMessage}
                        onClose={() => this.setState({ open: false })} />
                </Snackbar>
                <Search getRecipes={this.getRecipesHandler} />
                <Listrecipes recipes={this.state.recipes} deleteRecipe={this.deleteRecipe} />
            </div >
        )
    }
}

export default MainWindow
