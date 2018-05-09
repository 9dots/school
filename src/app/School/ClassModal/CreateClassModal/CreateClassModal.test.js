import React from 'react'
import ReactDOM from 'react-dom'
import CreateClassModal from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CreateClassModal />, div)
})
