import {addReducers} from 'src/state/reducers'

export default function (store) {
  return {
    path: '/contact',
    getComponent(nextState, next) {
      require.ensure([], require => {
        const contact = require('./reducers').default
        addReducers(store, {contact})

        const Container = require('./container').default
        next(null, Container)
      })
    },
  }
}
