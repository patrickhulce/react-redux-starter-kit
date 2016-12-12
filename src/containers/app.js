/* eslint-disable react/no-children-prop */
import React, {PropTypes} from 'react'

import {Router} from 'react-router'
import {Provider} from 'react-redux'

export default React.createClass({
  propTypes: {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  },
  render() {
    const {store, routes, history} = this.props

    return (
      <Provider store={store}>
        <div style={{height: '100%'}}>
          <Router history={history} children={routes} />
        </div>
      </Provider>
    )
  },
})
