import React from 'react'
import ReactDOM from 'react-dom'
import StudentModal from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<StudentModal />, div)
})
