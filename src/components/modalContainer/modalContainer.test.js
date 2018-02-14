import React from 'react'
import ReactDOM from 'react-dom'
import modalContainer from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<modalContainer />, div)
})
