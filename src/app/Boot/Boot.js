import React, { Component } from 'react'
import Header from 'components/Header'
import ClassList from 'components/ClassList'
import PropTypes from 'prop-types'
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
