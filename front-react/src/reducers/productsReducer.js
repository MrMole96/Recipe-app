import update from 'immutability-helper'
import { productsConst } from '../actions/actionTypes'
import initialState from './initialState'

export const productsReducer = (state = initialState.products, action) => {
    switch (action.type) {
        case productsConst.ADD_PRODUCT:
            return update(state, {
                downloading: { $set: true }
            })
        case productsConst.ADD_PRODUCT_SUCCESS:
            return update(state, {
                downloading: { $set: false },
                data: { $set: action.payload }
            })
        case productsConst.ADD_PRODUCT_FAIL:
            return update(state, {
                downloading: { $set: false }
            })
        case productsConst.GET_PRODUCTS:
            return update(state, {
                downloading: { $set: true }
            })
        case productsConst.GET_PRODUCTS_SUCCESS:
            return update(state, {
                downloading: { $set: false },
                data: { $set: action.payload }
            })
        case productsConst.GET_PRODUCTS_FAIL:
            return update(state, {
                downloading: { $set: false }
            })
        case productsConst.DELETE_PRODUCT:
            return update(state, {
                downloading: { $set: true }
            })
        case productsConst.DELETE_PRODUCT_SUCCESS:
            return update(state, {
                downloading: { $set: false },
                data: { $set: action.payload }
            })
        case productsConst.DELETE_PRODUCT_FAIL:
            return update(state, {
                downloading: { $set: false }
            })
        default:
            return state
    }
}