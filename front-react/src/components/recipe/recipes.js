import React, { Component } from 'react'
import axios from 'axios';
import Recipe from './recipe'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './recipe.css'
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ToDoList from './toDoList'

const Wrapper = styled.section`
  padding: 2em;
  border: 2px solid #039BE5;
  border-radius: 10px;
  width:100%
`;

const levels = ['Latwe', 'Srednie', 'Trudne']

export default class recipes extends Component {

    state = {
        recipes: [],
        recipesForm: {
            listOfProducts: [],
            description: [],
            numberOfPersons: 0,
            difficulty: 0,
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
                that.setState((prevState) => ({
                    recipes: recipes.data,
                    recipesForm: {
                        ...prevState.recipesForm,
                        listOfProducts: products.data
                    },
                    isLoading: true
                }))
                console.log('recipes', recipes)
                console.log('products', products)
            }));
    }

    handleChange = (event) => {
        console.log(event);
        this.setState({ testInput: event.target.value })
    }

    inputHandler = (event) => {
        const recipesForm = {
            ...this.state.recipesForm,
            [event.target.id]: event.target.value,
        }

        this.setState({ productForm: recipesForm })

    }

    deleteTaskHandler = (index) => {
        let tasks = this.state.recipesForm.description;
        console.log('tasks', tasks)
        console.log('index', index)
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
        array.push(task);
        this.setState((prevState) => ({
            recipesForm: {
                ...prevState.recipesForm,
                description: array
            }
        }));
    }

    inputSelectHandler = (event) => {
        const productForm = {
            ...this.state.productForm,
            listOfProducts: event.target.value,
        }
        this.setState({ productForm: productForm })
    }
    sendForm = () => {
        console.log('wysylam');
        axios.post('http://localhost:9000/Recipes', this.state.recipesForm)
            .then(response => {
                console.log(response);
                this.loadRecipes();
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    deleteRecipe = (recipeId) => {
        axios.delete('http://localhost:9000/Recipes', { params: { id: recipeId } })
            .then(response => {
                console.log(response);
                this.loadRecipes();
            })
            .catch(function (err) {
                console.log(err);
            })
    }
    componentDidMount() {
        this.loadData();
    }



    render() {
        let recipes = null
        var that = this;
        if (this.state.recipes) {
            recipes = this.state.recipes.map(function (recipe, index) {
                return <Grid item sm={12} md={6}>
                    <Recipe className="Recipe"
                        listOfProducts={recipe.listOfProducts}
                        name={recipe.name}
                        difficulty={recipe.difficulty}
                        numberOfPersons={recipe.numberOfPersons}
                        id={recipe._id}
                        key={recipe._id}
                        deleteRecipe={that.deleteRecipe} ></Recipe>
                </Grid>
            })
        }

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

                                    <Grid item sm={12} md={6}>

                                        <div>
                                            <TextField
                                                id="name"
                                                label="Nazwa"
                                                onChange={(value) => this.inputHandler(value)}
                                                helperText="Nazwa przepisu"
                                                margin="normal"
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="difficulty"
                                                select
                                                label="Wybierz"
                                                onChange={(value) => this.inputSelectHandler(value)}
                                                value={this.props.unit}
                                                helperText="Poziom trudnosci przepisu"
                                                margin="normal"
                                                style={{ width: '200px' }}
                                            >
                                                {levels.map(option => (
                                                    <MenuItem key={option._id} style={{ display: 'block', paddingLeft: '10px' }} value={option.name}>
                                                        {option.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        <div>
                                            <TextField
                                                id="numberOfPersons"
                                                label="Ilosc osob"
                                                onChange={(value) => this.inputHandler(value)}
                                                className="input"
                                                helperText="Szacunkowa ilosc osob na danie"
                                                margin="normal"
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item sm={12} md={6}>
                                        <div>
                                            <Autocomplete
                                                multiple
                                                options={this.state.recipesForm.listOfProducts}
                                                getOptionLabel={option => option.name}
                                                filterSelectedOptions
                                                onChange={this.inputSelectHandler}
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
                                        <h4>TODO list opis</h4>
                                        <ToDoList handler={this.toDoListHandler} description={this.state.recipesForm.description} deleteTaskHandler={this.deleteTaskHandler} />
                                    </Grid>
                                    <div className='Button'>
                                        <Button variant="contained" color="primary" onClick={() => this.sendForm()} startIcon={<SaveIcon />}>
                                            Zapisz
                        </Button>
                                    </div>


                                </Grid>
                            </form>
                        </Wrapper>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>

                <h2>Lista przepisow</h2>
                <div style={{ width: '100%' }}>
                    <Grid container spacing={3}>
                        {recipes}
                    </Grid>
                </div>

            </div>
        )
    }
}
