import React, { Component } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackBarWrapper } from '../../components/snackBarWrapper/SnackBarWrapper'
import axios from 'axios';
export default class Search extends Component {

    state = {
        products: [],
        recipes: [],
        open: false,
        snackMessage: '',
        snackVariant: '',
        loading: true
    };

    componentDidMount() {
        this.getProductsHandler();
    }

    getProductsHandler = () => {
        var that = this;
        axios.get('http://localhost:9000/Products')
            .then(res => {
                this.setState({
                    products: res.data,
                    loading: false
                })
            })
            .catch(function (err) {
         
                that.setState({
                    open: true,
                    snackMessage: 'Nie udalo sie pobrac produktow',
                    snackVariant: 'error'
                })
            })
    }
    selectHandler = (event, value) => {
        this.props.getRecipes(value);
    }
    render() {


        return (
            <div className="search">
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