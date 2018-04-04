import React from 'react'
import ReactDOM from 'react-dom'
import LessonDetails from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LessonDetails />, div)
})
