import debounce from 'lodash/debounce'
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {browserHistory, hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {IS_DEV} from '../env'

import createRootReducer, {requireReducers} from './reducers'

export default function createStoreAndHistory(initialState = {}) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const reducers = requireReducers()
  const store = createStore(
    createRootReducer(reducers),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  )

  store.reducers = reducers

  if (IS_DEV) {
    const debouncedSave = debounce(() => {
      localStorage.setItem('__state__', JSON.stringify(store.getState()))
    }, 500)

    const clearSaved = () => localStorage.setItem('__state__', null)
    document.addEventListener('keydown', e => {
      if (e.key === 'R' && (e.metaKey || e.ctrlKey)) {
        console.log('[redux] clearing saved state') // eslint-disable-line no-console
        clearSaved()
      }
    })

    store.subscribe(debouncedSave)

    if (module.hot) {
      module.hot.accept('./reducers', () => {
        const reducers = require('./reducers').default
        store.replaceReducer(reducers(store.reducers))
      })
    }
  }

  const history = IS_DEV ? hashHistory : browserHistory
  const syncedHistory = syncHistoryWithStore(history, store)

  return {store, history: syncedHistory}
}
