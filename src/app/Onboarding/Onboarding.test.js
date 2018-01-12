import React from 'react'
import ReactDOM from 'react-dom'
import Onboarding from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Onboarding />, div)
})
