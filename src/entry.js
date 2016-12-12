/* eslint-disable react/no-children-prop */
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory, hashHistory} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'

import createAppStore from './state/store'

const store = createAppStore(window.__INITIAL_STATE__)
const reactRoot = document.getElementById('react-root')

function renderApp() {
  const routes = require('./routes').default(store)
  const history = __DEV__ ? hashHistory : browserHistory
  const syncedHistory = syncHistoryWithStore(history, store)

  ReactDOM.render(
    <Provider store={store}>
      <div style={{height: '100%'}}>
        <Router history={syncedHistory} children={routes} />
      </div>
    </Provider>,
    reactRoot
  )
}

let render = renderApp

if (__DEV__) {
  const RedBox = require('redbox-react').default

  render = () => {
    try {
      renderApp()
    } catch (err) {
      ReactDOM.render(<RedBox error={err} />, reactRoot)
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
