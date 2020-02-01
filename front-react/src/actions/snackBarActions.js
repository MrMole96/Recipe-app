import { snackBarConst } from './actionTypes'

export function openSnackBar(dispatch, data) {
    return dispatch({
        type: snackBarConst.SNACKBAR_OPEN,
        payload: data
    })
}
export function closeSnackBar() {
    return {
        type: snackBarConst.SNACKBAR_CLOSE
    }
}