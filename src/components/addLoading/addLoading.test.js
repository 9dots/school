import React from 'react'
import ReactDOM from 'react-dom'
import addLoading from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<addLoading />, div)
})
