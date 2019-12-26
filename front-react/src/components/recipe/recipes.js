import React, { Component } from 'react'
import axios from 'axios';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './recipe.css'
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import ToDoList from './toDoList'
import ListRecipes from './ListRecipes'
const shortid = require('shortid');
const Wrapper = styled.section`
  padding: 2em;
  border: 2px solid #039BE5;
  border-radius: 10px;
  width:100%
`;

const levels = ['Latwe', 'Srednie', 'Trudne'];

export default class recipes extends Component {

    state = {
        listOfProducts: [],
        recipes: [],
        recipesForm: {
            productsInRecipe: [],
            description: [],
            numberOfPersons: 0,
            difficulty: '',
            name: ''
        },
        isLoading: false
    }

    loadRecipes = () => {
        return axios.get('http://localhost:9000/Recipes');
    }
    loadProducts = () => {
        return axios.get('http://localhost:9000/Products')
    }

    loadData = async () => {
        var that = this;
        this.setState({ isLoading: true })
        return await Promise.all([this.loadRecipes(), this.loadProducts()])
            .then(axios.spread(function (recipes, products) {
                that.setState({
                    recipes: recipes.data,
                    // recipesForm: {
                    //     ...prevState.recipesForm,
                    //     listOfProducts: products.data
                    // },
                    listOfProducts: products.data,
                    isLoading: true
                })
            }));
    }

    inputHandler = (event) => {
        const recipesForm = {
            ...this.state.recipesForm,
            [event.target.id]: event.target.value,
        }
        this.setState({ recipesForm: recipesForm })
    }

    deleteTaskHandler = (index) => {
        let tasks = this.state.recipesForm.description;
        // tasks = tasks.filter((task, indexT) => { return indexT !== index; })
        tasks.splice(index, 1);
        this.setState((prevState) => ({
            recipesForm: {
                ...prevState.recipesForm,
                description: tasks
            }
        }));

    }

    toDoListHandler = (task) => {
        console.log(task);
        let array = this.state.recipesForm.description;
        array.push({
            _id: shortid.generate(),
            description: task
        });
        console.log(array);
        this.setState({
            recipesForm: {
                ...this.state.recipesForm,
                description: array
            }
        });
    }

    inputProductsHandler = (event, values) => {
        const recipesForm = {
            ...this.state.recipesForm,
            productsInRecipe: values,
        }
        console.log(values)
        this.setState({ recipesForm: recipesForm })
    }

    inputDifficultyHandler = (event) => {
        const recipesForm = {
            ...this.state.recipesForm,
            difficulty: event.target.value,
        }
        console.log(event.target.value)
        this.setState({ recipesForm: recipesForm })
    }
    sendForm = () => {
        var that = this;
        let object = this.state.recipesForm;
        object.description = object.description.map(item => {
            return item.description
        })
        object.productsInRecipe = object.productsInRecipe.map(item => {
            return item._id;
        })
        console.log(object);
        axios.post('http://localhost:9000/Recipes', object)
            .then(response => {
                console.log(response);
                that.setState({
                    recipesForm: {
                        productsInRecipe: [],
                        description: [],
                        numberOfPersons: 0,
                        difficulty: '',
                        name: ''
                    }
                })
                that.loadData();
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    deleteRecipe = (recipeId) => {
        axios.delete('http://localhost:9000/Recipes', { params: { id: recipeId } })
            .then(response => {
                console.log(response);
                this.loadData();
            })
            .catch(function (err) {
                console.log(err);
            })
    }
    componentDidMount() {
        this.loadData();
    }



    render() {
        // let recipes = null
        // var that = this;
        // if (this.state.recipes) {
        //     recipes = this.state.recipes.map(function (recipe, index) {
        //         return <Grid item sm={12} md={6} key={index}>
        //             <Recipe className="Recipe"
        //                 listOfProducts={recipe.listOfProducts}
        //                 name={recipe.name}
        //                 difficulty={recipe.difficulty}
        //                 numberOfPersons={recipe.numberOfPersons}
        //                 id={recipe._id}
        //                 key={recipe._id}
        //                 deleteRecipe={that.deleteRecipe} ></Recipe>
        //         </Grid>
        //     })
        // }

        return (

            <div className="">
                <Grid container justify="space-between"
                    alignItems="center">
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <h2>Formatka do dodawania przepisu</h2>
                        <Wrapper>
                            <form>
                                <Grid container spacing={3}>
                                    <Grid item sm={12} md={4}>
                                        <div>
                                            <TextField
                                                id="name"
                                                label="Nazwa"
                                                onChange={(value) => this.inputHandler(value)}
                                                value={this.state.recipesForm.name}
                                                helperText="Nazwa przepisu"
                                                margin="normal"
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="difficulty"
                                                select
                                                label="Wybierz"
                                                onChange={(value) => this.inputDifficultyHandler(value)}
                                                value={this.state.recipesForm.difficulty}
                                                helperText="Poziom trudnosci przepisu"
                                                margin="normal"
                                                style={{ width: '200px' }}
                                            >
                                                {levels.map((option, index) => (
                                                    <MenuItem key={index} style={{ display: 'block', paddingLeft: '10px' }} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        <div>
                                            <TextField
                                                id="numberOfPersons"
                                                label="Ilosc osob"
                                                onChange={(value) => this.inputHandler(value)}
                                                value={this.state.recipesForm.numberOfPersons}
                                                className="input"
                                                helperText="Szacunkowa ilosc osob na danie"
                                                margin="normal"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item sm={12} md={8}>
                                        <div>
                                            <Autocomplete
                                                multiple
                                                options={this.state.listOfProducts}
                                                getOptionLabel={option => option.name}
                                                filterSelectedOptions
                                                onChange={this.inputProductsHandler}
                                                value={this.state.recipesForm.productsInRecipe}
                                                renderInput={params => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        label="Wybierz produkty do przepisu"
                                                        placeholder="Produkt"
                                                        margin="normal"
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </div>
                                        <ToDoList
                                            handler={this.toDoListHandler}
                                            description={this.state.recipesForm.description}
                                            deleteTaskHandler={this.deleteTaskHandler} />
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={2} />
                                        <Grid item xs={8} style={{ textAlign: "center" }}>
                                            <Button variant="contained" color="primary" onClick={() => this.sendForm()} startIcon={<SaveIcon />}>
                                                Zapisz
                                        </Button>
                                        </Grid>
                                        <Grid item xs={2} />
                                    </Grid>
                                </Grid>
                            </form>
                        </Wrapper>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
                <h2>Lista przepisow</h2>

                {/* <Grid container spacing={5}>
                        {recipes}
                    </Grid> */}
                <ListRecipes recipes={this.state.recipes} deleteRecipe={this.deleteRecipe} />



            </div>
        )
    }
}
