import * as React from 'react'
import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-15'

import Home from './content'

Enzyme.configure({adapter: new Adapter()});

describe('routes/home/container.js', () => {
  it('should render', () => {
    const mockChild = <div className="child" />
    const component = Enzyme.shallow(<Home>{mockChild}</Home>)
    expect(component).toMatchSnapshot()
  })
})
