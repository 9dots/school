import React from 'react'
import ReactDOM from 'react-dom'
import CreateCourseModal from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CreateCourseModal />, div)
})
