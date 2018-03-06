import {LayoutContainer} from '../containers/layout'

import homeRoute from './home'
import contactRoute from './contact'
import { IAugmentedStore } from '../state/reducers'

export default function (store: IAugmentedStore<any>) {
  return {
    path: '/',
    indexRoute: homeRoute(),
    getComponent(nextState: any, next: any) {
      next(null, LayoutContainer)
    },
    childRoutes: [
      contactRoute(store),
      {path: '*', onEnter: (s: any, replace: any) => replace('/')},
    ],
  }
}
