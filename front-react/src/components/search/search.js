import React, { Component } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
export default class Search extends Component {

    constructor(props) {
        super(props);
        console.log('[App.js] constructor');
    }
    state = {
        products: [],
        recipes:[]
    };

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                this.setState({ products: res.data })            
                console.log(res.data)
            })
    }
    selectHandler = (event, value) => {
        let that = this;
        axios.post('http://localhost:9000/Products', value)
            .then(function (response) {
                console.log(response)
                that.setState({recipes:response})
            })
            .catch(function (err) {
                console.log(err);
            })
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