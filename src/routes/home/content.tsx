import * as React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

export interface IHomeProps {
  children: JSX.Element
}

export default class Home extends React.Component<IHomeProps> {
  render() {
    return (
      <div className="container">
        <h1><i className="fa fa-home" /> Home</h1>
        <Link to="contact">Contact</Link>
        {this.props.children}
      </div>
    )
  }
}
