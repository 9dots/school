import React from 'react'
import ReactDOM from 'react-dom'
import TaskDot from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TaskDot />, div)
})
