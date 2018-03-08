import React from 'react'
import ReactDOM from 'react-dom'
import StudentHeader from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<StudentHeader />, div)
})
