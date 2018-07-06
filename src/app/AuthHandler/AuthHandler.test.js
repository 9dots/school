import React from 'react'
import ReactDOM from 'react-dom'
import AuthHandler from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AuthHandler />, div)
})
