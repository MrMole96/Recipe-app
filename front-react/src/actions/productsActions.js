import { productsConst } from './actionTypes'
import axios from 'axios'
import { openSnackBar } from './snackBarActions'


const handleAddProduct = (dispatch) => {
    return dispatch({ type: productsConst.ADD_PRODUCT })
}

const handleFetchProductSuccess = (dispatch, response) => {
    return dispatch({ type: productsConst.GET_PRODUCTS_SUCCESS, payload: response })
}

const handleFetchProductError = (dispatch) => {
    return dispatch({ type: productsConst.GET_PRODUCTS_FAIL })
}


export function addProduct(product) {
    return async (dispatch) => {
        handleAddProduct(dispatch)
        try {
            let response = await axios.post('/Products', product);
            console.log('response', response)
            handleFetchProductSuccess(dispatch, response.data.products)
            console.log("SNACKBARR")
            openSnackBar(dispatch, { message: response.data.text, variant: 'success' })

        } catch (error) {
            handleFetchProductError(dispatch)
        }


    }
}