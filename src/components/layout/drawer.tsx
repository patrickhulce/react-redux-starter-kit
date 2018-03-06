import * as React from 'react'
import * as classNames from 'classnames'
import * as styles from './drawer.less'

export interface IDrawerProps {
  open: boolean
  children: JSX.Element | JSX.Element[]
}

export class Drawer extends React.Component<IDrawerProps> {
  render() {
    if (!this.props.open) {
      return null
    }

    return (
      <div className={classNames(styles.drawer)}>
        {this.props.children}
      </div>
    )
  }
}
