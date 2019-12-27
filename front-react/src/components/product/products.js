import React, { Component } from 'react'
import axios from 'axios';
import Product from './product'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './product.css'
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import SnackBarWrapper from '../SnackBarWrapper/SnackBarWrapper'
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';

const Wrapper = styled.section`
  padding: 2em;
  border: 2px solid #039BE5;
  border-radius: 10px;
  max-width:450px;
`;

const units = ['ml', 'g', 'szt', 'dkg', 'kg'];

export default class products extends Component {

    state = {
        products: [],
        productForm: {
            name: '',
            amount: 0,
            calories: 0,
            unit: ''
        },
        validationForm: {
            name: [],
            amount: [],
            calories: [],
            unit: []
        },
        open: false,
        snackMessage: '',
        snackVariant: '',
        isLoading: false
    }

    loadProducts = () => {
        var that = this;
        axios.get('http://localhost:9000/Products')
            .then(function (response) {
                console.log(response.data)
                this.setState({ products: response.data })
                this.setState({ isLoading: true })
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

    handleChange = (event) => {
        console.log(event);
        this.setState({ testInput: event.target.value })
    }

    inputHandler = (event) => {
        const productForm = {
            ...this.state.productForm,
            [event.target.id]: event.target.value,
        }

        this.setState({ productForm: productForm })

    }
    inputSelectHandler = (event) => {
        const productForm = {
            ...this.state.productForm,
            unit: event.target.value,
        }
        this.setState({ productForm: productForm })
    }
    sendForm = () => {
        console.log('wysylam');
        var that = this;
        if (this.validationHandler()) return;
        axios.post('http://localhost:9000/Products', this.state.productForm)
            .then(response => {
                console.log(response);
                this.setState({
                    open: true,
                    snackMessage: response.data,
                    snackVariant: 'success'
                })
                this.loadProducts();

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

    validationHandler = () => {
        for (let prop in this.state.productForm) {
            switch (prop) {
                case 'name':
                    {
                        let array = this.state.validationForm.name
                        if (this.state.productForm[prop].trim().length <= 1 && !array.includes('Nazwa produktu za krotka')) {
                            array.push('Nazwa produktu za krotka');
                        } else if (this.state.productForm[prop].trim().length > 1) {
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
                case 'amount':
                    {
                        let array = this.state.validationForm.amount
                        if (this.state.productForm[prop] <= 0 && !array.includes('Ilosc musi byc wieksza od zera')) {
                            array.push('Ilosc musi byc wieksza od zera');
                        } else if (this.state.productForm[prop] > 0) {
                            array.pop();
                        }
                        this.setState({
                            validationForm: {
                                ...this.state.validationForm,
                                amount: array
                            }
                        })
                    }
                    break;
                case 'calories':
                    {
                        let array = this.state.validationForm.calories
                        if (this.state.productForm[prop] <= 0 && !array.includes('Ilosc musi byc wieksza od zera')) {
                            array.push('Ilosc musi byc wieksza od zera');
                        } else if (this.state.productForm[prop] > 0) {
                            array.pop();
                        }
                        this.setState({
                            validationForm: {
                                ...this.state.validationForm,
                                calories: array
                            }
                        })
                    }
                    break;
                case 'unit':
                    {
                        let array = this.state.validationForm.unit
                        if (this.state.productForm[prop] <= 0 && !array.includes('Nie wybrano miary')) {
                            array.push('Nie wybrano miary');
                        } else if (this.state.productForm[prop] != undefined) {
                            array.pop();
                        }
                        this.setState({
                            validationForm: {
                                ...this.state.validationForm,
                                unit: array
                            }
                        })
                    }
                    break;
            }

        }
        return true;
    }


    deleteProduct = (productId) => {
        axios.delete('http://localhost:9000/Products', { params: { id: productId } })
            .then(response => {
                console.log(response);
                this.setState({
                    open: true,
                    snackMessage: response.data,
                    snackVariant: 'success'
                })
                this.loadProducts();


            })
            .catch(function (err) {
                console.log(err);
                this.setState({
                    open: true,
                    snackMessage: 'Nie udalo sie',
                    snackVariant: 'error'
                })
            })
    }
    componentDidMount() {
        this.loadProducts();
    }



    render() {
        let products = null
        var that = this;
        if (this.state.products) {
            products = this.state.products.map(function (product, index) {
                return <Box key={index} flexGrow={1} marginX={1} width={250}>
                    <Product className="Product"
                        name={product.name}
                        amount={product.amount}
                        calories={product.calories}
                        unit={product.unit}
                        id={product._id}
                        key={product._id}
                        deleteProduct={that.deleteProduct} />
                </Box>
            })
        }

        return (
            <div>
                <Snackbar
                    open={this.state.open}
                    onClose={() => this.setState({ open: false })}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                //autoHideDuration={6000}
                >
                    <SnackBarWrapper
                        variant={this.state.snackVariant}
                        message={this.state.snackMessage}
                        onClose={() => this.setState({ open: false })} />
                </Snackbar>
                <Grid container alignContent="center" justify="center" direction="column">
                    <h2>Formatka do dodawania produktu</h2>
                    <Wrapper>
                        <form noValidate >
                            <div>
                                <TextField
                                    id="name"
                                    label="Nazwa"
                                    onChange={(value) => this.inputHandler(value)}
                                    placeholder="Nazwa produktu"
                                    margin="normal"
                                    helperText={this.state.validationForm.name}
                                    error={this.state.validationForm.name.length != 0}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="amount"
                                    label="Ilosc"
                                    className="input"
                                    onChange={(value) => this.inputHandler(value)}
                                    placeholder="Ilosc produktu"
                                    helperText={this.state.validationForm.amount}
                                    error={this.state.validationForm.amount.length != 0}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextField
                                    id="calories"
                                    label="Kalorie"
                                    onChange={(value) => this.inputHandler(value)}
                                    className="input"
                                    placeholder="Ilosc kalori w produkcie"
                                    margin="normal"
                                    helperText={this.state.validationForm.calories}
                                    error={this.state.validationForm.calories.length != 0}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="unit"
                                    select
                                    label="Wybierz"
                                    onChange={(value) => this.inputSelectHandler(value)}
                                    value={this.state.productForm.unit}
                                    placeholder="Miara ilosci produktu"
                                    margin="normal"
                                    style={{ width: '200px' }}
                                    helperText={this.state.validationForm.unit}
                                    error={this.state.validationForm.unit.length != 0}
                                >
                                    {units.map(option => (
                                        <MenuItem key={option} style={{ display: 'block', paddingLeft: '10px' }} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className='Button'>
                                <Button variant="contained" color="primary" onClick={() => this.sendForm()} startIcon={<SaveIcon />}>
                                    Zapisz
                        </Button></div>

                        </form>
                    </Wrapper>
                </Grid>


                <h2>Lista produktow</h2>
                <div style={{ width: '100%' }}>
                    <Box display="flex" flexWrap="wrap">
                        {products}
                    </Box>
                </div>
            </div>
        )
    }
}