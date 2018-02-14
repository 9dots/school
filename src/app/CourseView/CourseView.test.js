import React from 'react'
import ReactDOM from 'react-dom'
import CourseView from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CourseView />, div)
})
