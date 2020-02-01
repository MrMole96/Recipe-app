import initialState from "./initialState";
import { snackBarConst } from "../actions/actionTypes";
import update from 'immutability-helper'


export const snackBarReducer = (state = initialState.snackBar, action) => {
  
    console.log('action.payload', action)
    switch (action.type) {
        case snackBarConst.SNACKBAR_OPEN:
            return update(state, {
                open: { $set: true },
                variant: { $set: action.payload.variant },
                message: { $set: action.payload.message }
            })
        case snackBarConst.SNACKBAR_CLOSE:
            return update(state, {
                open: { $set: false }
            })

        default:
            return state
    }
}