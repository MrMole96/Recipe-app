import React, { Component } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
export default class Search extends Component {

    state = {
        products: [],
        recipes: [],
        loading: true
    };

    componentDidMount() {
        this.getProductsHandler();
    }

    getProductsHandler = () => {
        axios.get('http://localhost:9000/Products')
            .then(res => {
                this.setState({
                    products: res.data,
                    loading: false
                })
            })
    }
    selectHandler = (event, value) => {
        this.props.getRecipes(value);
    }
    render() {


        return (
            <div className="search">
                <Autocomplete
                    multiple
                    options={this.state.products}
                    getOptionLabel={option => option.name}
                    filterSelectedOptions
                    onChange={this.selectHandler}
                    loading={this.state.loading}
                    renderInput={params => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Wybierz z czego chcesz cos zrobic"
                            placeholder="Produkt"
                            margin="normal"
                            fullWidth
                        />
                    )}
                />
            </div>

        )
    }
}