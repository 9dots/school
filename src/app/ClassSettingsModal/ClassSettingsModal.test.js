import React from 'react'
import ReactDOM from 'react-dom'
import ClassSettingsModal from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ClassSettingsModal />, div)
})
