import omit from 'lodash/omit'
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {path as layoutPath, reducer as layoutReducer} from '../containers/layout.reducers'

export function addReducers(store, reducers) {
  Object.assign(store.reducers, reducers)
  store.replaceReducer(createRootReducer(store.reducers))
}

export function removeReducers(store, keys) {
  store.reducers = omit(store.reducers, keys)
  store.replaceReducer(createRootReducer(store.reducers))
}

export function requireReducers() {
  return {
    [layoutPath]: layoutReducer,
  }
}

export default function createRootReducer(reducers) {
  return combineReducers({routing: routerReducer, ...reducers})
}
