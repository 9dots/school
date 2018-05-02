import React from 'react'
import ReactDOM from 'react-dom'
import StudentLoginModal from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<StudentLoginModal />, div)
})
