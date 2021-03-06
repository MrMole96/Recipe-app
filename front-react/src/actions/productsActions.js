import { productsConst } from './actionTypes'
import axios from 'axios'
import { openSnackBar } from './snackBarActions'


const handleAddProduct = (dispatch) => {
    return dispatch({ type: productsConst.ADD_PRODUCT })
}

const handleFetchProductSuccess = (dispatch, response) => {
    return dispatch({ type: productsConst.ADD_PRODUCT_SUCCESS, payload: response })
}

const handleFetchProductError = (dispatch) => {
    return dispatch({ type: productsConst.ADD_PRODUCT_FAIL })
}

const handleFetchProducts = (dispatch) => {
    return dispatch({ type: productsConst.GET_PRODUCTS })
}

const handleFetchProductsSuccess = (dispatch, response) => {
    return dispatch({ type: productsConst.GET_PRODUCTS_SUCCESS, payload: response })
}

const handleFetchProductsFail = (dispatch) => {
    return dispatch({ type: productsConst.GET_PRODUCTS_FAIL })
}

const handleDeleteProduct = (dispatch) => {
    return dispatch({ type: productsConst.DELETE_PRODUCT })
}

const handleDeleteProductSuccess = (dispatch, response) => {
    return dispatch({ type: productsConst.DELETE_PRODUCT_SUCCESS, payload: response })
}

const handleDeleteProductFail = (dispatch) => {
    return dispatch({ type: productsConst.DELETE_PRODUCT_FAIL })
}


export function deleteProduct(productId) {
    return async (dispatch) => {
        handleDeleteProduct(dispatch)
        try {
            let response = await axios.delete('/Products', { params: { id: productId } })
            handleDeleteProductSuccess(dispatch, response.data.products)
            openSnackBar(dispatch, { message: response.data.text, variant: 'success' })
        } catch (error) {
            handleDeleteProductFail(dispatch)
            openSnackBar(dispatch, { message: error.message, variant: 'error' })
        }
    }

}

export function addProduct(product) {
    return async (dispatch) => {
        handleAddProduct(dispatch)
        try {
            let response = await axios.post('/Products', product);
            handleFetchProductSuccess(dispatch, response.data.products)
            openSnackBar(dispatch, { message: response.data.text, variant: 'success' })

        } catch (error) {
            handleFetchProductError(dispatch)
            openSnackBar(dispatch, { message: error.message, variant: 'error' })
        }
    }
}

export function getProducts() {
    return async (dispatch) => {
        handleFetchProducts(dispatch)
        try {
            let response = await axios.get('/Products');
            handleFetchProductsSuccess(dispatch, response.data)

        } catch (error) {
            handleFetchProductsFail(dispatch)
            openSnackBar(dispatch, { message: error.message, variant: 'error' })
        }
    }
}