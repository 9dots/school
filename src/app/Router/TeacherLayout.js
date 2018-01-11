import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from '../Header'

class TeacherLayout extends Component {
  render () {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

TeacherLayout.propTypes = {}

export default TeacherLayout
