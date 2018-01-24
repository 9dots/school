import React from 'react'
import ReactDOM from 'react-dom'
import ModalContainer from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ModalContainer />, div)
})
