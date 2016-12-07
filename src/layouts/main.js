import React, {PropTypes} from 'react'

export default class Main extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    return (
      <div className="container">
        <h1>Layout</h1>
        {this.props.children}
      </div>
    )
  }
}
