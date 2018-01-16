import './styles/app.less'
import './sw/register'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {INITIAL_STATE, IS_DEV} from './env'

// tslint:disable
const App = require('./containers/app').default
const createStoreAndHistory = require('./state/store').default
// tslint:enable

document.body.classList.add('loaded')
const reactRoot = document.getElementById('react-root')
const {store, history} = createStoreAndHistory(INITIAL_STATE)

function renderApp(): void {
  // tslint:disable-next-line
  const routes = require('./routes').default(store)
  ReactDOM.render(<App store={store} routes={routes} history={history} />, reactRoot)
}

let render = renderApp

if (IS_DEV) {
  // tslint:disable-next-line
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
