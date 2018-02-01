import React from 'react'
import ReactDOM from 'react-dom'
import waitFor from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<waitFor />, div)
})
