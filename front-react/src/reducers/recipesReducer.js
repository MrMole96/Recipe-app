import initialState from "./initialState";
import { recipesConst } from '../actions/actionTypes'
import update from 'immutability-helper'

export const recipeReducer = (state = initialState.recipes, action) => {
    switch (action.type) {
        case recipesConst.GET_RECIPES:
            return update(state, {
                downloading: { $set: true }
            })
        case recipesConst.GET_RECIPES_SUCCESS:
            return update(state, {
                downloading: { $set: false },
                data: { $set: action.payload }
            })
        default:
            return state
    }
}