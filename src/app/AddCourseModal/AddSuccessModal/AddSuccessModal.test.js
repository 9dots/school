import React from 'react'
import ReactDOM from 'react-dom'
import AddSuccessModal from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AddSuccessModal />, div)
})
