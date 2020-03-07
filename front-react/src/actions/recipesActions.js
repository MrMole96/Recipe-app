import axios from 'axios'
import { recipesConst } from './actionTypes'
import { openSnackBar } from './snackBarActions'

const handleGetRecipes = (dispatch) => {
    return dispatch({
        type: recipesConst.GET_RECIPES
    })
}

const handleGetRecipesSuccess = (dispatch, data) => {
    return dispatch({
        type: recipesConst.GET_RECIPES_SUCCESS,
        payload: data
    })
}

const handleGetRecipesFail = (dispatch) => {
    return dispatch({
        type: recipesConst.GET_RECIPES_FAIL
    })
}

const handlePostRecipe = (dispatch) => {
    return dispatch({
        type: recipesConst.ADD_RECIPE
    })
}

const handlePostRecipeSuccess = (dispatch, data) => {
    return dispatch({
        type: recipesConst.ADD_RECIPE_SUCCESS,
        payload: data
    })
}

const handlePostRecipeFail = (dispatch) => {
    return dispatch({
        type: recipesConst.ADD_RECIPE_FAIL
    })
}

const handleDeleteRecipe = (dispatch) => {
    return dispatch({
        type: recipesConst.DELETE_RECIPE
    })
}

const handleDeleteRecipeSuccess = (dispatch, data) => {
    return dispatch({
        type: recipesConst.DELETE_RECIPE_SUCCESS,
        payload: data
    })
}

const handleDeleteRecipeFail = (dispatch) => {
    return dispatch({
        type: recipesConst.DELETE_RECIPE_FAIL
    })
}


export function getRecipes() {
    return async (dispatch) => {
        handleGetRecipes(dispatch)
        try {
            let response = await axios.get('/Recipes');
            handleGetRecipesSuccess(dispatch, response.data)
        } catch (error) {
            handleGetRecipesFail(dispatch)
            openSnackBar(dispatch, { message: error.message, variant: 'error' })
        }
    }
}

export function addRecipe(recipe) {
    return async (dispatch) => {
        handlePostRecipe(dispatch)
        try {
            let response = await axios.post('/Recipes', recipe);
            handlePostRecipeSuccess(dispatch, recipe)
            openSnackBar(dispatch, { message: response.data.text, variant: 'success' })
        } catch (error) {
            handlePostRecipeFail(dispatch)
            openSnackBar(dispatch, { message: error.message, variant: 'error' })
        }
    }
}

export function deleteRecipe(recipeId) {
    return async (dispatch) => {
        handleDeleteRecipe(dispatch)
        try {
            let response = await axios.delete('/Recipes', { params: { id: recipeId } })
            handleDeleteRecipeSuccess(dispatch, recipeId)
            openSnackBar(dispatch, { message: response.data.text, variant: 'success' })
        } catch (error) {
            handleDeleteRecipeFail(dispatch)
            openSnackBar(dispatch, { message: error.message, variant: 'error' })
        }
    }
}