import React, { Component } from 'react'
import Search from '../components/search/search'
import Listrecipes from '../components/recipe/ListRecipes'
import axios from 'axios';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
export class MainWindow extends Component {

    state = {
        recipes: [],
        open: false,
        snackMessage: ''
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
            })
    }

    deleteRecipe = (recipeId) => {
        axios.delete('http://localhost:9000/Recipes', { params: { id: recipeId } })
            .then(response => {
                console.log(response);
                this.setState({ open: true, snackMessage: response.data })
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    TransitionLeft = (props) => {
        return <Slide {...props} />;
    }

    render() {
        return (
            <div>
                <Snackbar
                    open={this.state.open}
                    style={{ backgroundColor: green[600] }}
                    onClose={() => this.setState({ open: false })}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    autoHideDuration={6000}
                    variant="success"
                    message={<span id="message-id">{this.state.snackMessage}</span>}
                />
                <Search getRecipes={this.getRecipesHandler} />
                <Listrecipes recipes={this.state.recipes} deleteRecipe={this.deleteRecipe} />
            </div >
        )
    }
}

export default MainWindow
