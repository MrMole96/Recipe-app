import initialState from "./initialState";
import { recipesConst } from '../actions/actionTypes'
import update from 'immutability-helper'

export const recipeReducer = (state = initialState.recipes, action) => {
    switch (action.type) {
        case recipesConst.ADD_RECIPE:
            return update(state, {
                downloading: { $set: true }
            })
        case recipesConst.ADD_RECIPE_SUCCESS:
            return update(state, {
                downloading: { $set: false },
                data: { $set: action.payload }
            })
        case recipesConst.ADD_RECIPE_FAIL:
            return update(state, {
                downloading: { $set: false }
            })
        case recipesConst.GET_RECIPES:
            return update(state, {
                downloading: { $set: true }
            })
        case recipesConst.GET_RECIPES_SUCCESS:
            return update(state, {
                downloading: { $set: false },
                data: { $set: action.payload }
            })
        case recipesConst.DELETE_RECIPE:
            return update(state, {
                downloading: { $set: true }
            })
        case recipesConst.DELETE_RECIPE_SUCCESS:
            return update(state, {
                downloading: { $set: false },
                data: { $set: action.payload }
            })
        case recipesConst.DELETE_RECIPE_FAIL:
            return update(state, {
                downloading: { $set: false }
            })
        default:
            return state
    }
}