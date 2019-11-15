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

const Wrapper = styled.section`
  padding: 5px;
  background: white;
  text-align:center;
`;

const units = ['ml', 'g', 'szt', 'dkg'];

export default class products extends Component {

    state = {
        product: {},
        products: []
    }


    componentDidMount() {
        var that = this;
        axios.get('http://localhost:9000/Products')
            .then(function (response) {
                console.log(response.data)
                that.setState({ products: response.data })
            })
            .catch(function (err) {
                console.log(err);
            })
    }



    render() {
        let products = null

        if (this.state.products) {
            products = this.state.products.map(function (product, index) {
                return <Product className="Product" name={product.name} key={product.id} />
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
                                onChange={(value) => this.props.formHandler(value)}
                                helperText="Nazwa produktu"
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                id="amount"
                                label="Ilosc"
                                className="input"
                                onChange={(value) => this.props.formHandler(value)}
                                helperText="Ilosc produktu"
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                id="calories"
                                label="Kalorie"
                                onChange={(value) => this.props.formHandler(value)}
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
                                onChange={(value) => this.props.formSelectHandler(value)}
                                value={this.props.unit}
                                helperText="Miara ilosci produktu"
                                margin="normal"
                                style={{ width: '200px' }}
                            >
                                {units.map(option => (
                                    <MenuItem key={option} style={{ display: 'block',paddingLeft:'10px' }} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className='Button'>
                            <Button variant="contained" color="primary"  onClick={()=>this.props.sendForm()} startIcon={<SaveIcon />}>
                                Zapisz
                        </Button></div>

                    </form>
                </Wrapper>


                <h2>Lista produktow</h2>
                {products}

            </div>
        )
    }
}
