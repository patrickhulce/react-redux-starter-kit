import omit from 'lodash/omit'
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

export function addReducers(store, reducers) {
  Object.assign(store.reducers, reducers)
  store.replaceReducer(createRootReducer(store.reducers))
}

export function removeReducers(store, keys) {
  store.reducers = omit(store.reducers, keys)
  store.replaceReducer(createRootReducer(store.reducers))
}

export default function createRootReducer(reducers) {
  return combineReducers({routing: routerReducer, ...reducers})
}
