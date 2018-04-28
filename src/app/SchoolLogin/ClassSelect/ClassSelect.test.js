import React from 'react'
import ReactDOM from 'react-dom'
import ClassSelect from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ClassSelect />, div)
})
