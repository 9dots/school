import React from 'react'
import ReactDOM from 'react-dom'
import LessonForm from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LessonForm />, div)
})
