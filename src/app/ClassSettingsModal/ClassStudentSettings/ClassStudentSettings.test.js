import React from 'react'
import ReactDOM from 'react-dom'
import ClassStudentSettings from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ClassStudentSettings />, div)
})
