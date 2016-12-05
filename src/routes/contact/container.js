import React from 'react'
import {connect} from 'react-redux'

class Contact extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Contact</h1>
        {this.props.children}
      </div>
    )
  }
}

export default connect(state => state, {})(Contact)
