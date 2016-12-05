import debounce from 'lodash/debounce'
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'

import history from './history'
import createRootReducer from './reducers'
import {updateLocation} from './location'

export default function createAppStore(initialState = {}, restore) {
  const store = createStore(
    createRootReducer(),
    initialState,
    applyMiddleware(thunk)
  )

  store.reducers = {}
  store.unsubscribeHistory = history.listen(updateLocation(store))

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
