import React, { Component } from 'react'
import Search from '../components/search/search'
import Listrecipes from '../components/recipe/ListRecipes'
import axios from 'axios';
export class MainWindow extends Component {

    state = {
        recipes: []
    }
    getRecipesHandler = (products) => {
        let that = this;
        axios.post('http://localhost:9000/Recipes', products)
            .then(function (response) {
                console.log(response)
                that.setState({ recipes: response })
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <Search getRecipes={this.getRecipesHandler} />
                <Listrecipes recipes={this.state.recipes} />
            </div>
        )
    }
}

export default MainWindow
