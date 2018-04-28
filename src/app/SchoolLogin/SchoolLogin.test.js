import React from 'react'
import ReactDOM from 'react-dom'
import SchoolLogin from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SchoolLogin />, div)
})
