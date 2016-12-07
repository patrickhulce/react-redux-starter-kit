import debounce from 'lodash/debounce'
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'

import createRootReducer from './reducers'

export default function createAppStore(initialState = {}, restore) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  )

  store.reducers = {}

  if (__DEV__) {
    const debouncedSave = debounce(() => {
      localStorage.setItem('__state__', JSON.stringify(store.getState()))
    }, 500)

    store.subscribe(debouncedSave)

    if (module.hot) {
      module.hot.accept('./reducers', () => {
        const reducers = require('./reducers').default
        store.replaceReducer(reducers(store.reducers))
      })
    }
  }

  return store
}
