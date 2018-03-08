import React from 'react'
import ReactDOM from 'react-dom'
import LessonItem from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LessonItem />, div)
})
