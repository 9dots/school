import React from 'react'
import ReactDOM from 'react-dom'
import SchoolModal from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<SchoolModal />, div)
})
