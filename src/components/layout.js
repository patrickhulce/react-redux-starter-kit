import React, {PropTypes} from 'react'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'

import classNamesModule from 'classnames/bind'

import MenuLink from './menu-link'
import dynamicStyles from './layout.less'

const classNames = classNamesModule.bind(dynamicStyles)

const links = [
  {text: 'Home', icon: 'fa-home', path: '/'},
  {text: 'Contact', icon: 'fa-address-book', path: '/contact'},
]

export default React.createClass({
  propTypes: {
    content: PropTypes.element.isRequired,
    sidebar: PropTypes.element,
    isDrawerOpen: PropTypes.bool.isRequired,
    isSidebarOpen: PropTypes.bool.isRequired,
    setIsDrawerOpen: PropTypes.func.isRequired,
    toggleIsDrawerOpen: PropTypes.func.isRequired,
  },

  handleAppBarToggle() {
    this.props.toggleIsDrawerOpen()
  },
  handleMenuLinkTap() {
    this.props.toggleIsDrawerOpen()
  },
  handleDrawerRequestChange(value) {
    this.props.setIsDrawerOpen(value)
  },

  renderMenuLink(linkProps) {
    return <MenuLink key={linkProps.path} onTouchTap={this.handleMenuLinkTap} {...linkProps} />
  },
  renderDrawer() {
    const classes = classNames('drawer')

    return (
      <Drawer
        docked={false}
        width={350}
        open={this.props.isDrawerOpen}
        onRequestChange={this.handleDrawerRequestChange}
        containerClassName={classes}>
        <Menu>
          {links.map(this.renderMenuLink)}
        </Menu>
      </Drawer>
    )
  },
  renderSidebar() {
    if (this.props.sidebar) {
      const classes = classNames('sidebar')

      return (
        <Drawer
          open={this.props.isSidebarOpen}
          containerStyle={{zIndex: 1000}}
          containerClassName={classes}>
          {this.props.sidebar}
        </Drawer>
      )
    }
  },
  renderContent() {
    const containerClasses = classNames('content', {
      'content--drawer-open': this.props.isDrawerOpen,
      'content--sidebar-open': this.props.sidebar && this.props.isSidebarOpen,
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
        <AppBar title="React App" onLeftIconButtonTouchTap={this.handleAppBarToggle} zDepth={2} />
        {this.renderDrawer()}
        {this.renderSidebar()}
        {this.renderContent()}
      </div>
    )
  },
})
