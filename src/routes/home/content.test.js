import React from 'react'
import renderer from 'react-test-renderer'

import Home from './content'

describe('routes/home/container.js', () => {
  it('should render', () => {
    const mockChild = <div className="child" />
    const component = renderer.create(<Home>{mockChild}</Home>)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
