import React from 'react'
import ReactDOM from 'react-dom'
import LessonStudentView from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LessonStudentView />, div)
})
