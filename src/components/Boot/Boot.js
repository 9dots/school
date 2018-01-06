import React, { Component } from 'react'
import './Boot.less'

class Boot extends Component {
  render () {
    const { hi } = this.props
    return <div onClick={hi}>Boot</div>
  }
}

Boot.propTypes = {}

export default Boot
