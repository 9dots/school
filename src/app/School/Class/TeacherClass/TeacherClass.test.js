import React from 'react'
import ReactDOM from 'react-dom'
import TeacherClass from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TeacherClass />, div)
})
