import * as React from 'react'
import * as classNames from 'classnames'
import * as styles from './layout.less'

import {AppBar} from './app-bar'
import {Drawer} from './drawer'
import {MenuLink, IMenuLinkProps} from './menu-link'

const links = [
  {text: 'Home', icon: 'fa-home', path: '/'},
  {text: 'Contact', icon: 'fa-address-book', path: '/contact'},
]

export interface ILayoutProps {
  content: JSX.Element
  sidebar?: JSX.Element
  isDrawerOpen: boolean
  isSidebarOpen: boolean
  toggleIsDrawerOpen(): void
}

export class Layout extends React.Component<ILayoutProps> {
  renderMenuLink(linkProps: IMenuLinkProps) {
    return <MenuLink key={linkProps.path} {...linkProps} />
  }

  renderDrawer() {
    return (
      <Drawer
        open={this.props.isDrawerOpen}>
        {links.map(this.renderMenuLink)}
      </Drawer>
    )
  }

  renderSidebar() {
    if (this.props.sidebar) {
      return (
        <Drawer open={this.props.isSidebarOpen}>
          {this.props.sidebar}
        </Drawer>
      )
    }
  }

  renderContent() {
    const containerClasses = classNames({
      [styles.contentDrawerOpen]: this.props.isDrawerOpen,
      [styles.contentSidebarOpen]: this.props.sidebar && this.props.isSidebarOpen,
    })

    return (
      <div className={containerClasses}>
        {this.props.content}
      </div>
    )
  }
  render() {
    return (
      <div className="transparent-container">
        <AppBar toggleIsDrawerOpen={this.props.toggleIsDrawerOpen} />
        {this.renderDrawer()}
        <div className={classNames(styles.appContainer)}>
          {this.renderSidebar()}
          {this.renderContent()}
        </div>
      </div>
    )
  }
}
