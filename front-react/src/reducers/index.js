import { combineReducers } from 'redux'
import { recipeReducer } from './recipesReducer'
import { productsReducer } from './productsReducer'
import { snackBarReducer } from './snackBarReducer'


export default combineReducers({
    products: productsReducer,
    recipes: recipeReducer,
    snackBar: snackBarReducer
})
