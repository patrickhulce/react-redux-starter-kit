import get from 'lodash/get'
import {connect} from 'react-redux'
import Layout from 'src/components/layout'

import {setDrawer, toggleDrawer} from './layout.reducers'

export default connect(
  state => {
    return {
      isDrawerOpen: get(state, 'ui:layout.isDrawerOpen'),
      isSidebarOpen: get(state, 'ui:layout.isSidebarOpen'),
    }
  },
  dispatch => {
    return {
      toggleIsDrawerOpen: () => dispatch(toggleDrawer()),
      setIsDrawerOpen: value => dispatch(setDrawer(value)),
    }
  }
)(Layout)
