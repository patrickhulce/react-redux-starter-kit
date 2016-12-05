import React from 'react'

export default class Main extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Layout</h1>
        {this.props.children}
      </div>
    )
  }
}
