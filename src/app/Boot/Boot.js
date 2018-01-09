import React, { Component } from 'react'
import ClassList from '../ClassList'
import PropTypes from 'prop-types'
import Header from '../Header'
import './Boot.less'

class Boot extends Component {
  render () {
    return (
      <div>
        <Header />
        <ClassList />
      </div>
    )
  }
}

Boot.propTypes = {}

export default Boot
