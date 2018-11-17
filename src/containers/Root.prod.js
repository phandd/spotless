import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root