import React, {PropTypes} from 'react'
import {Link} from 'react-router'

export default class Home extends React.Component {
  static propTypes = {
    children: PropTypes.element,
  }

  render() {
    return (
      <div className="container">
        <h1>Home</h1>
        <Link to="contact">Contact</Link>
        {this.props.children}
      </div>
    )
  }
}
