import React from 'react'
import ReactDOM from 'react-dom'
import StepModal from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<StepModal />, div)
})
