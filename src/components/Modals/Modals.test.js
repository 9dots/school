import React from 'react'
import ReactDOM from 'react-dom'
import Modals from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Modals />, div)
})
