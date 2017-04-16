import React, {PropTypes} from 'react'
import classNamesModule from 'classnames/bind'
import dynamicStyles from './drawer.less'

const classNames = classNamesModule.bind(dynamicStyles)

export default React.createClass({
  propTypes: {
    open: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
  },
  render() {
    if (!this.props.open) {
      return null
    }

    return (
      <div className={classNames('drawer')}>
        {this.props.children}
      </div>
    )
  },
})
