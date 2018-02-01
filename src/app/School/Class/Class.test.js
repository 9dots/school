import React from 'react'
import ReactDOM from 'react-dom'
import Class from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Class />, div)
})
