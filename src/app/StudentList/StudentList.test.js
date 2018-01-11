import React from 'react'
import ReactDOM from 'react-dom'
import StudentList from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<StudentList />, div)
})
