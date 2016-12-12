/* eslint-disable import/no-unassigned-import */
import './styles/app.less'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './containers/app'
import initialRoutes from './routes'
import createStoreAndHistory from './state/store'

const reactRoot = document.getElementById('react-root')
const {store, history} = createStoreAndHistory(window.__INITIAL_STATE__)

function renderApp(routes) {
  ReactDOM.render(
    <App store={store} routes={routes} history={history} />,
    reactRoot
  )
}

let render = renderApp

if (__DEV__) {
  const RedBox = require('redbox-react').default

  render = routes => {
    try {
      renderApp(routes)
    } catch (err) {
      ReactDOM.render(<RedBox error={err} />, reactRoot)
    }
  }

  if (module.hot) {
    module.hot.accept('./routes', () => {
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(reactRoot)
        render(require('./routes').default(store))
      })
    })
  }
}

render(initialRoutes)
