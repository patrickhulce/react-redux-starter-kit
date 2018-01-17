import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/app.less'
import './sw/register'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {App} from './containers/app'
import {INITIAL_STATE, IS_DEV} from './env'

// tslint:disable-next-line
const createStoreAndHistory = require('./state/store').default

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
