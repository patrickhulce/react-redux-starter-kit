import React, {PropTypes} from 'react'
import classNamesModule from 'classnames/bind'
import dynamicStyles from './app-bar.less'

const classNames = classNamesModule.bind(dynamicStyles)

export default React.createClass({
  propTypes: {
    toggleIsDrawerOpen: PropTypes.func.isRequired,
  },
  handleAppBarToggle() {
    this.props.toggleIsDrawerOpen()
  },
  render() {
    return (
      <nav className={classNames('app-bar')}>
        <div className="container-fluid">
          <div className="pull-left">
            <div className={classNames('app-bar__icon')}>
              <i role="button" className="fa fa-navicon" onClick={this.handleAppBarToggle} />
            </div>
            <div className={classNames('app-bar__brand')}>
              React App
            </div>
          </div>
        </div>
      </nav>
    )
  },
})
