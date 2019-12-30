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
import Snackbar from '@material-ui/core/Snackbar';
import SnackBarWrapper from '../SnackBarWrapper/SnackBarWrapper'
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
        validationForm: {
            name: [],
            difficulty: [],
            numberOfPersons: [],
            productsInRecipe: [],
            description: []
        },
        open: false,
        snackMessage: '',
        snackVariant: '',
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
            }))
            .catch(function (err) {
                console.log(err)
                that.setState({
                    open: true,
                    snackMessage: 'Nie udalo sie pobrac danych',
                    snackVariant: 'error'
                })
            });
    }


    validationHandler = () => {

        for (let prop in this.state.recipesForm) {
            switch (prop) {
                case 'name':
                    {
                        let array = this.state.validationForm.name
                        if (this.state.recipesForm[prop].trim().length <= 1 && !array.includes('Nazwa przepisu za krotka')) {
                            array.push('Nazwa przepisu za krotka');

                        } else if (this.state.recipesForm[prop].trim().length > 1) {
                            array.pop();
                        }
                        this.setState({
                            validationForm: {
                                ...this.state.validationForm,
                                name: array
                            }
                        })

                    }
                    break;
                case 'difficulty':
                    {
                        let array = this.state.validationForm.difficulty
                        if (this.state.recipesForm[prop] <= 0 && !array.includes('Wybierz poziom trudnosci')) {
                            array.push('Wybierz poziom trudnosci');

                        } else if (this.state.recipesForm[prop] != "") {
                            array.pop();
                        }
                        this.setState({
                            validationForm: {
                                ...this.state.validationForm,
                                difficulty: array
                            }
                        })

                    }
                    break;
                case 'numberOfPersons':
                    {
                        let array = this.state.validationForm.numberOfPersons
                        if (this.state.recipesForm[prop] <= 0 && !array.includes('Ilosc musi byc wieksza od zera')) {
                            array.push('Ilosc musi byc wieksza od zera');

                        } else if (this.state.recipesForm[prop] > 0) {
                            array.pop();
                        }
                        this.setState({
                            validationForm: {
                                ...this.state.validationForm,
                                numberOfPersons: array
                            }
                        })

                    }
                    break;
                case 'productsInRecipe':
                    {
                        let array = this.state.validationForm.productsInRecipe
                        if (this.state.recipesForm[prop].length === 0 && !array.includes('Nie wybrano zadnego skladnika')) {
                            array.push('Nie wybrano zadnego skladnika');

                        } else if (this.state.recipesForm[prop] != "") {
                            array.pop();
                        }
                        this.setState({
                            validationForm: {
                                ...this.state.validationForm,
                                productsInRecipe: array
                            }
                        })

                    }
                    break;
                case 'description':
                    {
                        let array = this.state.validationForm.description
                        if (this.state.recipesForm[prop] <= 0 && !array.includes('Brak opisu')) {
                            array.push('Brak opisu');

                        } else if (this.state.recipesForm[prop] != "") {
                            array.pop();
                        }
                        this.setState({
                            validationForm: {
                                ...this.state.validationForm,
                                description: array
                            }
                        })

                    }
                    break;
            }
        }
        let isError = false;
        for (let prop in this.state.validationForm) {
            if (this.state.validationForm[prop].length !== 0) {
                console.log('prop', prop)
                console.log(this.state.validationForm[prop])
                isError = true;
            }
        }
        return isError;
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

        if (this.validationHandler()) return;

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
                                                placeholder="Nazwa przepisu"
                                                margin="normal"
                                                helperText={this.state.validationForm.name}
                                                error={this.state.validationForm.name.length != 0}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="difficulty"
                                                select
                                                label="Wybierz"
                                                onChange={(value) => this.inputDifficultyHandler(value)}
                                                value={this.state.recipesForm.difficulty}
                                                placeholder="Poziom trudnosci przepisu"
                                                margin="normal"
                                                style={{ width: '200px' }}
                                                helperText={this.state.validationForm.difficulty}
                                                error={this.state.validationForm.difficulty.length != 0}
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
                                                placeholder="Szacunkowa ilosc osob na danie"
                                                margin="normal"
                                                helperText={this.state.validationForm.numberOfPersons}
                                                error={this.state.validationForm.numberOfPersons.length != 0}
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
                                                        helperText={this.state.validationForm.productsInRecipe}
                                                        error={this.state.validationForm.productsInRecipe.length != 0}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <ToDoList
                                            handler={this.toDoListHandler}
                                            description={this.state.recipesForm.description}
                                            deleteTaskHandler={this.deleteTaskHandler}
                                            errorHandler={this.state.validationForm.description.length != 0}
                                            errorText={this.state.validationForm.description}
                                        />
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
                <ListRecipes recipes={this.state.recipes} deleteRecipe={this.deleteRecipe} />
            </div>
        )
    }
}