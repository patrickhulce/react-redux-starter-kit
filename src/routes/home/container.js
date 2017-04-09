import React, {PropTypes} from 'react'
import {Link} from 'react-router'

export default React.createClass({
  propTypes: {
    children: PropTypes.element,
  },
  render() {
    return (
      <div className="container">
        <h1><i className="fa fa-home"></i> Home</h1>
        <Link to="contact">Contact</Link>
        {this.props.children}
      </div>
    )
  },
})
