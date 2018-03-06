import {addReducers, IAugmentedStore} from '../../state/reducers'

export default function (store: IAugmentedStore<any>) {
  return {
    path: '/contact',
    getComponents(nextState: any, next: any) {
      (require as any).ensure([], (require: any) => {
        const contact = require('./reducers').default
        addReducers(store, {contact})

        const content = require('./content').default
        next(null, {content})
      })
    },
  }
}
