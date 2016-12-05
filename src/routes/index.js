import MainLayout from 'src/layouts/main'

import homeRoute from './home'
import contactRoute from './contact'

export default function (store) {
  return {
    path: '/',
    indexRoute: homeRoute(store),
    getComponent(nextState, next) {
      next(null, MainLayout)
    },
    childRoutes: [
      contactRoute(store),
      {path: '*', onEnter: (s, replace) => replace('/')},
    ],
  }
}
