import React, {PropTypes} from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'

export default React.createClass({
  propTypes: {
    children: PropTypes.element.isRequired,
  },
  getInitialState() {
    return {drawerOpen: false}
  },
  handleDrawerToggle() {
    this.setState({drawerOpen: !this.state.drawerOpen})
  },
  render() {
    return (
      <div className="app-container">
        <AppBar
          title="React App"
          onLeftIconButtonTouchTap={this.handleDrawerToggle}
          zDepth={1}
          />
        <Drawer
          open={this.state.drawerOpen}
          containerStyle={{zIndex: 1000}}
          containerClassName="primary-drawer">
          <h3>Drawer</h3>
        </Drawer>
        <div className="body-container">
          {this.props.children}
        </div>
      </div>
    )
  },
})
