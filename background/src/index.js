import { wrapStore } from 'react-chrome-redux';
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
)

wrapStore(store, { portName: 'spotless' });
