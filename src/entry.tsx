/* tslint:disable */
import './sw/register'
import './styles/app.less'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {IS_DEV, INITIAL_STATE} from './env'

const App = require('./containers/app').default
const createStoreAndHistory = require('./state/store').default

document.body.classList.add('loaded')
const reactRoot = document.getElementById('react-root')
const {store, history} = createStoreAndHistory(INITIAL_STATE)

function renderApp() {
  const routes = require('./routes').default(store)
  ReactDOM.render(
    <App store={store} routes={routes} history={history} />,
    reactRoot
  )
}

let render = renderApp

if (IS_DEV) {
  const RedBox = require('redbox-react').default

  render = () => {
    try {
      renderApp()
    } catch (err) {
      ReactDOM.render(<RedBox error={err} />, reactRoot)
    }
  }

  const hotModule: any = (module as any).hot
  if (hotModule) {
    hotModule.accept('./routes', () => {
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(reactRoot!)
        render()
      })
    })
  }
}

render()
