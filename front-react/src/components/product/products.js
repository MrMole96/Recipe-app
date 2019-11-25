import React, { Component } from 'react'
import axios from 'axios';
import Product from './product'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './product.css'
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@material-ui/core/MenuItem';
import { Ring } from 'react-awesome-spinners'

import Box from '@material-ui/core/Box';
const Wrapper = styled.section`
  padding: 5px;
  border: 2px solid #039BE5;
  border-radius: 10px
  text-align:center;
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
        isLoading: false
    }

    loadProducts = () => {
        var that = this;
        this.setState({ isLoading: false })
        axios.get('http://localhost:9000/Products')
            .then(function (response) {
                console.log(response.data)
                that.setState({ products: response.data })
                that.setState({ isLoading: true })
            })
            .catch(function (err) {
                console.log(err);
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
        axios.post('http://localhost:9000/Products', this.state.productForm)
            .then(response => {
                console.log(response);
                this.loadProducts();
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    componentDidMount() {
        this.loadProducts();
    }



    render() {
        let products = null

        if (this.state.products) {
            products = this.state.products.map(function (product, index) {
                return <Box flexGrow={1} marginX={1} width={250}>
                    <Product className="Product"
                        name={product.name}
                        amount={product.amount}
                        calories={product.calories}
                        unit={product.unit}
                        key={product.id} />
                </Box>
            })
        }

        return (

            <div className="">
                <h2>Formatka do dodawania produktu</h2>
                <Wrapper>
                    <form>
                        <div>
                            <TextField
                                id="name"
                                label="Nazwa"
                                onChange={(value) => this.formHandler(value)}
                                helperText="Nazwa produktu"
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                id="amount"
                                label="Ilosc"
                                className="input"
                                onChange={(value) => this.formHandler(value)}
                                helperText="Ilosc produktu"
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                id="calories"
                                label="Kalorie"
                                onChange={(value) => this.formHandler(value)}
                                className="input"
                                helperText="Ilosc kalori w produkcie"
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                id="unit"
                                select
                                label="Wybierz"
                                onChange={(value) => this.formSelectHandler(value)}
                                value={this.props.unit}
                                helperText="Miara ilosci produktu"
                                margin="normal"
                                style={{ width: '200px' }}
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
