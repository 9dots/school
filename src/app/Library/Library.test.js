import React from 'react'
import ReactDOM from 'react-dom'
import Library from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Library />, div)
})
