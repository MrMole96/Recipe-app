export default {

    login: {
        downloading: false,
        error: false,
        data: {
            email: '',
            password: ''
        }
    },
    products: {
        downloading: false,
        error: false,
        data: []
    },
    recipes: {
        downloading: false,
        error: false,
        data: [],
        formStep:0
    },
    snackBar: {
        open: false,
        variant: '',
        message: ''
    }
}