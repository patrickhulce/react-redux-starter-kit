import * as React from 'react'
import {connect} from 'react-redux'

export interface IContactProps {
  children: JSX.Element
}

export class Contact extends React.Component<IContactProps> {
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
