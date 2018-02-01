import React from 'react'
import ReactDOM from 'react-dom'
import SchoolDetails from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SchoolDetails />, div)
})
