import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import DevTools from './DevTools'

const Root = ({ store }) => (
    <Provider store={store}>
      <div>
        <App />
        {/*<DevTools />*/}
      </div>
    </Provider>
)

export default Root