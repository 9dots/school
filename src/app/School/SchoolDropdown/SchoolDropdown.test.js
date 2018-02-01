import React from 'react'
import ReactDOM from 'react-dom'
import SchoolDropdown from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SchoolDropdown />, div)
})
