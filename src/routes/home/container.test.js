import React from 'react'
import renderer from 'react-test-renderer'

import Home from './container'

describe('routes/home/container.js', () => {
  it('should render', () => {
    const mockChild = <div className="child" />
    const component = renderer.create(<Home>{mockChild}</Home>)

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
