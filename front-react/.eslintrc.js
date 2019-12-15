module.exports = {
    env: {
        browser: true,
        node: true,
        es6:true
    },
    parser: "babel-eslint",
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    plugins: [
        "react"
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            modules: true
        },
        ecmaVersion: 6,
        sourceType: "module",
    },
    rules: {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/prop-types": [0]
    }
}