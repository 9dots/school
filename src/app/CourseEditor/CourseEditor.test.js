import React from 'react'
import ReactDOM from 'react-dom'
import CourseEditor from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CourseEditor />, div)
})
