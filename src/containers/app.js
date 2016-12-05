import React from 'react'
import {Router} from 'react-router'
import {Provider} from 'react-redux'

import history from 'src/history'

class AppContainer extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const {routes, store} = this.props

    return (
      <Provider store={store}>
        <div style={{height: '100%'}}>
          <Router history={history} children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
