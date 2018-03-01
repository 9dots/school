import React from 'react'
import ReactDOM from 'react-dom'
import NoActiveLesson from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NoActiveLesson />, div)
})
