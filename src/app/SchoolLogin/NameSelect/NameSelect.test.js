import React from 'react'
import ReactDOM from 'react-dom'
import NameSelect from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<NameSelect />, div)
})
