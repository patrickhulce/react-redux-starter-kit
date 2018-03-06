import {assign, omit} from 'lodash'
import {combineReducers, Store, ReducersMapObject} from 'redux'
import {routerReducer} from 'react-router-redux'

import {path as layoutPath, reducer as layoutReducer} from '../containers/layout.reducers'

export interface IAugmentedStore<T> extends Store<T> {
  reducers: ReducersMapObject
}

export function addReducers(store: IAugmentedStore<any>, reducers: ReducersMapObject) {
  assign(store.reducers, reducers)
  store.replaceReducer(createRootReducer(store.reducers))
}

export function removeReducers(store: IAugmentedStore<any>, keys: string[]) {
  store.reducers = omit(store.reducers, keys)
  store.replaceReducer(createRootReducer(store.reducers))
}

export function requireReducers() {
  return {
    [layoutPath]: layoutReducer,
  }
}

export default function createRootReducer(reducers: ReducersMapObject) {
  return combineReducers({routing: routerReducer, ...reducers})
}
