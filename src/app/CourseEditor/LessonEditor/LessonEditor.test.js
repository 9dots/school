import React from 'react'
import ReactDOM from 'react-dom'
import LessonEditor from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<LessonEditor />, div)
})
