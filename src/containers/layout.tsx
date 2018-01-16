import {get} from 'lodash'
import {connect} from 'react-redux'

import {setDrawer, toggleDrawer} from './layout.reducers'

// tslint:disable-next-line
const Layout = require('../components/layout').default

// tslint:disable-next-line
export const LayoutContainer = connect(
  state => ({
    isDrawerOpen: get(state, 'ui:layout.isDrawerOpen'),
    isSidebarOpen: get(state, 'ui:layout.isSidebarOpen'),
  }),
  dispatch => ({
    toggleIsDrawerOpen: () => dispatch(toggleDrawer()),
    setIsDrawerOpen: value => dispatch(setDrawer(value)),
  }),
)(Layout)
