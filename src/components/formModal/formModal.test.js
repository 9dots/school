import React from 'react'
import ReactDOM from 'react-dom'
import formModal from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<formModal />, div)
})
