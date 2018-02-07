import React from 'react'
import ReactDOM from 'react-dom'
import LessonList from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LessonList />, div)
})
