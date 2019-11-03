import React, { Component } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import axios from 'axios';
export default class Search extends Component {

    state = {
        products: 'aaa'
    };

    // componentDidMount() {
    //     axios.get('https://jsonplaceholder.typicode.com/users')
    //         .then(res => {
    //             this.setState({ products: res.data })
    //             console.log(res.data)
    //         })
    // }
    render() {
        return (
            <div>
                <Autocomplete
                    multiple
                    options={this.state.products}
                    getOptionLabel={option => option.name}
                    style={{ width: 300 }}
                    renderInput={params => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="List produktów"
                            placeholder="Wybierz produkt"
                            margin="normal"
                        />
                    )}
                />
                search state
                    {this.state.products}
            </div>

        )
    }
}
