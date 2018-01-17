import * as React from 'react'
import * as classNames from 'classnames'
import * as styles from './app-bar.less'

export interface IAppBarProps {
  toggleIsDrawerOpen: () => void
}

export class AppBar extends React.Component<IAppBarProps> {
  constructor(props: IAppBarProps, context: any) {
    super(props, context)
    this.handleAppBarToggle = this.handleAppBarToggle.bind(this)
  }

  handleAppBarToggle() {
    this.props.toggleIsDrawerOpen()
  }

  render() {
    return (
      <nav className={classNames(styles.appBar)}>
        <div className="container-fluid">
          <div className="pull-left">
            <div className={classNames(styles.appBarIcon)}>
              <i role="button" className="fa fa-navicon" onClick={this.handleAppBarToggle} />
            </div>
            <div className={classNames(styles.appBarBrand)}>
              React App
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
