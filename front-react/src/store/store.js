import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

export default createStore(
  reducers,
  applyMiddleware(promise, thunk, createLogger())
)
