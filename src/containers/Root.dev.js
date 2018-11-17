import React from 'react'
import PropTypes from 'prop-types'
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
Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root