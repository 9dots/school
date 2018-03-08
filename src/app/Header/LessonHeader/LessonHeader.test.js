import React from 'react'
import ReactDOM from 'react-dom'
import LessonHeader from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LessonHeader />, div)
})
