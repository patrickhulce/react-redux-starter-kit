import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import classNamesModule from 'classnames/bind'

import dynamicStyles from './layout.less'

const classNames = classNamesModule.bind(dynamicStyles)

export default React.createClass({
  propTypes: {
    content: PropTypes.element.isRequired,
    sidebar: PropTypes.element,
  },
  getInitialState() {
    return {
      drawerOpen: false,
      sidebarOpen: true,
    }
  },
  handleDrawerToggle() {
    this.setState({drawerOpen: !this.state.drawerOpen})
  },
  handleSidebarToggle() {
    this.setState({sidebarOpen: !this.state.sidebarOpen})
  },
  renderDrawer() {
    const classes = classNames('drawer')

    return (
      <Drawer
        docked={false}
        width={350}
        open={this.state.drawerOpen}
        // eslint-disable-next-line react/jsx-no-bind
        onRequestChange={drawerOpen => this.setState({drawerOpen})}
        containerClassName={classes}>
        <Menu>
          <MenuItem
            primaryText="Home"
            leftIcon={<i className="fa fa-home" />}
            containerElement={<Link to="/" />}
            onTouchTap={this.handleDrawerToggle}
            />
          <MenuItem
            primaryText="Contact"
            leftIcon={<i className="fa fa-address-book" />}
            containerElement={<Link to="/contact" />}
            onTouchTap={this.handleDrawerToggle}
            />
        </Menu>
      </Drawer>
    )
  },
  renderSidebar() {
    if (this.props.sidebar) {
      const classes = classNames('sidebar')

      return (
        <Drawer
          open={this.state.sidebarOpen}
          containerStyle={{zIndex: 1000}}
          containerClassName={classes}>
          {this.props.sidebar}
        </Drawer>
      )
    }
  },
  renderContent() {
    const containerClasses = classNames('content', {
      'content--drawer-open': this.state.drawerOpen,
      'content--sidebar-open': this.props.sidebar && this.state.sidebarOpen,
    })

    return (
      <div className={containerClasses}>
        {this.props.content}
      </div>
    )
  },
  render() {
    return (
      <div className="app-container">
        <AppBar title="React App" onLeftIconButtonTouchTap={this.handleDrawerToggle} zDepth={2} />
        {this.renderDrawer()}
        {this.renderSidebar()}
        {this.renderContent()}
      </div>
    )
  },
})
