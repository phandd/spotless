import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'
import '../style/index.less'
import { Store, applyMiddleware } from 'react-chrome-redux'
import thunkMiddleware from 'redux-thunk';

const store = new Store({
  portName: 'spotless'
})

const middleware = [thunkMiddleware];
const storeWithMiddleware = applyMiddleware(store, ...middleware);

storeWithMiddleware.ready().then(() => {
  render(
    <Root store={store} />,
    document.getElementById('root')
  )
})
