import React from 'react'
import ReactDOM from 'react-dom'
import PrintPasswords from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<PrintPasswords />, div)
})
