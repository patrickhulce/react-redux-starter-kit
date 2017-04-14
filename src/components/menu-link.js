import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import MenuItem from 'material-ui/MenuItem'

export default React.createClass({
  propTypes: {
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onTouchTap: PropTypes.func,
  },
  render() {
    const {text, path, icon, onTouchTap} = this.props
    const props = {
      primaryText: text,
      containerElement: <Link to={path} />,
    }

    if (icon) {
      const iconClass = icon.includes('fa') ? `fa ${icon}` : icon
      props.leftIcon = <i className={iconClass} />
    }

    if (onTouchTap) {
      props.onTouchTap = onTouchTap
    }

    return <MenuItem {...props} />
  },
})
