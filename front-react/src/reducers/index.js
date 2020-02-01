import { combineReducers } from 'redux'
import { productsReducer } from './productsReducer'
import { snackBarReducer } from './snackBarReducer'


export default combineReducers({
    products: productsReducer,
    snackBar: snackBarReducer
})
