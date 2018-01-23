import React from 'react'
import ReactDOM from 'react-dom'
import AddStudentModal from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<AddStudentModal />, div)
})
