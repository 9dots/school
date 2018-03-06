import StudentHeader from '../Header/StudentHeader'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import Header from '../Header'

class AppLayout extends Component {
  render () {
    const { isStudent = true, children, ...rest } = this.props

    return (
      <div>
        {isStudent ? <StudentHeader {...rest} /> : <Header {...rest} />}
        {children}
      </div>
    )
  }
}

AppLayout.propTypes = {}

export default AppLayout
