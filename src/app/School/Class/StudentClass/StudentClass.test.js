import React from 'react'
import ReactDOM from 'react-dom'
import StudentClass from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<StudentClass />, div)
})
