import { combineReducers } from 'redux'
import { recipeReducer } from './recipesReducer'
import { productsReducer } from './productsReducer'
import { snackBarReducer } from './snackBarReducer'
import { wizReducer } from './wizReducer'


export default combineReducers({
    products: productsReducer,
    recipes: recipeReducer,
    snackBar: snackBarReducer,
    wiz: wizReducer 
})
