import * as React from 'react'

import {Provider, Store} from 'react-redux'
import {Router} from 'react-router'

export interface IAppProps {
  store: Store<any>
  routes: any
  history: any
}

export class App extends React.Component<IAppProps> {
  public render(): React.ReactNode {
    const {store, routes, history} = this.props

    return (
      <Provider store={store}>
        <div style={{height: '100%'}}>
          <div />
          <Router history={history} children={routes} />
        </div>
      </Provider>
    )
  }
}
