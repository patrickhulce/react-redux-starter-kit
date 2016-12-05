import React from 'react'
import ReactDOM from 'react-dom'

import AppContainer from './containers/app'
import createAppStore from './store'

const store = createAppStore(window.__INITIAL_STATE__)
const reactRoot = document.getElementById('react-root')

function renderApp() {
  const routes = require('./routes').default(store)
  ReactDOM.render(<AppContainer store={store} routes={routes} />, reactRoot)
}

let render = renderApp

if (__DEV__) {
  const RedBox = require('redbox-react').default

  render = () => {
    try {
      renderApp()
    } catch (error) {
      ReactDOM.render(<RedBox error={error} />, reactRoot)
    }
  }

  if (module.hot) {
    module.hot.accept('./routes', () => {
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(reactRoot)
        render()
      })
    })
  }
}

render()
