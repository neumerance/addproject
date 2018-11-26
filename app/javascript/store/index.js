import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const initialState = {}

const middleware = [thunk]

const redux_dev_tools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
let enhancers = compose(
  applyMiddleware(...middleware)
)

if(redux_dev_tools) {
  enhancers = compose(
    applyMiddleware(...middleware),
    redux_dev_tools
  )
}

const store = createStore(
  rootReducer,
  initialState,
  enhancers
)


export default store
