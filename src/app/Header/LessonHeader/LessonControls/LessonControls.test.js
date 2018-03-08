import React from 'react'
import ReactDOM from 'react-dom'
import LessonControls from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LessonControls />, div)
})
