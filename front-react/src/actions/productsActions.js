import { productsConst } from './actionTypes'
import axios from 'axios'


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
        console.log('loader start')
        try {
            let response = await axios.post('/Products', product);
            console.log('response', response)
            handleFetchProductSuccess(dispatch, response.data)
            console.log('loader end')

        } catch (error) {
            handleFetchProductError(dispatch)
        }


    }
}