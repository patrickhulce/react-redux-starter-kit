import {addReducers} from 'src/state/reducers'

export default function (store) {
  return {
    path: '/contact',
    getComponents(nextState, next) {
      require.ensure([], require => {
        const contact = require('./reducers').default
        addReducers(store, {contact})

        const content = require('./content').default
        next(null, {content})
      })
    },
  }
}
