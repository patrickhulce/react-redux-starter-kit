import {LayoutContainer} from 'src/containers/layout'

import homeRoute from './home'
import contactRoute from './contact'

export default function (store) {
  return {
    path: '/',
    indexRoute: homeRoute(store),
    getComponent(nextState, next) {
      next(null, LayoutContainer)
    },
    childRoutes: [
      contactRoute(store),
      {path: '*', onEnter: (s, replace) => replace('/')},
    ],
  }
}
