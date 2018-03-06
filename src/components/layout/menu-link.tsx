import * as React from 'react'
import * as classNames from 'classnames'
import * as styles from './menu-link.less'

import {Link} from 'react-router'

export interface IMenuLinkProps {
  text: string
  path: string
  icon?: string
}

export class MenuLink extends React.Component<IMenuLinkProps> {
  render() {
    let iconElem
    const {text, path, icon} = this.props

    if (icon) {
      const iconClass = /fa/.test(icon) ? `fa ${icon}` : icon
      iconElem = <i role="button" className={iconClass} />
    }

    return (
      <Link
        to={path}
        className={styles.menuLink}
        activeClassName={styles.menuLinkActive}>
        {iconElem}
        {text}
      </Link>
    )
  }
}
