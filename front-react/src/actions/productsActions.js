import { productsConst } from './actionTypes'
import axios from 'axios'
export function addProduct(product) {
    return (dispatch) => {
        axios.post('/Product', product)
            .then(
                response => dispatch({ type: productsConst.ADD_PRODUCT_FULFILLED, payload: response }),
                error => dispatch({ type: productsConst.ADD_PRODUCT_REJECTED, error: error })
            )
    }
}