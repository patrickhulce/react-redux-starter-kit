import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import dynamicStyles from './menu-link.less'

export default React.createClass({
  propTypes: {
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.string,
  },
  render() {
    let iconElem
    const {text, path, icon} = this.props

    if (icon) {
      const iconClass = icon.includes('fa') ? `fa ${icon}` : icon
      iconElem = <i role="button" className={iconClass} />
    }

    return (
      <Link
        to={path}
        className={dynamicStyles['menu-link']} // eslint-disable-line react/forbid-component-props
        activeClassName={dynamicStyles['menu-link--active']}>
        {iconElem}
        {text}
      </Link>
    )
  },
})
