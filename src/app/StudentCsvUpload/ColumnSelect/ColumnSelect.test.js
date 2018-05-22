import React from 'react'
import ReactDOM from 'react-dom'
import ColumnSelect from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ColumnSelect />, div)
})
