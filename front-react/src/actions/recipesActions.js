import axios from 'axios'
import { recipesConst } from './actionTypes'


const handleGetRecipes = (dispatch) => {
    return dispatch({
        type: recipesConst.GET_RECIPES
    })
}

const handleGetRecipesSuccess = (dispatch, response) => {
    return dispatch({
        type: recipesConst.GET_RECIPES_SUCCESS,
        payload: response
    })
}

const handleGetRecipesFail = (dispatch) => {
    return dispatch({
        type: recipesConst.GET_RECIPES_FAIL
    })
}




export function getRecipes() {
    return async (dispatch) => {
        handleGetRecipes(dispatch)
        try {
            let response = await axios.get('/Recipes');
            handleGetRecipesSuccess(dispatch, response.data)
        } catch (e) {
            handleGetRecipesFail(dispatch)
        }
    }
}