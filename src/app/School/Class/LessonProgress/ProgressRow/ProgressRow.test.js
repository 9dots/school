import React from 'react'
import ReactDOM from 'react-dom'
import ProgressRow from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ProgressRow />, div)
})
