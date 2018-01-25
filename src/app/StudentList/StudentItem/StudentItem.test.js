import React from 'react'
import ReactDOM from 'react-dom'
import StudentItem from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<StudentItem />, div)
})
