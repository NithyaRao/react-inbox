import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import logger from 'redux-logger'

// const initialState = {}

const store = createStore(
  rootReducer,
  // initialState,
  applyMiddleware(
    thunkMiddleware,
    logger,
  )
)

export default store

// can pass APi to thunkMiddleware as extra
// thunkMiddleware.withExtraArgument({Api})
