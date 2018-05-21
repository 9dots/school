import React from 'react'
import ReactDOM from 'react-dom'
import DrivePicker from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DrivePicker />, div)
})
