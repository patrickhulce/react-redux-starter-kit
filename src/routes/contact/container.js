import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

const Contact = React.createClass({
  propTypes: {
    children: PropTypes.element,
  },
  render() {
    return (
      <div className="container">
        <h1>Contact</h1>
        {this.props.children}
      </div>
    )
  },
})

export default connect(state => state, {})(Contact)
