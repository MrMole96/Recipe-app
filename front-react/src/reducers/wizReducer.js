import initialState from "./initialState";
import { stepperConst } from "../actions/actionTypes";
import update from 'immutability-helper'


export const wizReducer = (state = initialState.wiz, action) => {

    switch (action.type) {
        case stepperConst.NEXT_STEP:
            return update(state, {
                formStep: { $set: state.formStep + 1 }
            })
        case stepperConst.PREVIOUS_STEP:
            return update(state, {
                formStep: { $set: state.formStep - 1 }
            })

        default:
            return state
    }
}