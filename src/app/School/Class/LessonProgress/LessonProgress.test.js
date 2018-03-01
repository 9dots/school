import React from 'react'
import ReactDOM from 'react-dom'
import LessonProgress from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LessonProgress />, div)
})
