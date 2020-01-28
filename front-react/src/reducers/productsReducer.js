import update from 'immutability-helper'
import { productsConst } from '../actions/actionTypes'
import initialState from './initialState'

export const productsReducer = (state = initialState.products, action) => {
    switch (action.type) {
        case productsConst.ADD_PRODUCT_PENDING:
            return update(state, {
                dowloanding: { $set: true }
            })
        default:
            return state
    }
}