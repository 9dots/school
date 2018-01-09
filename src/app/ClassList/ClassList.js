// import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import React from 'react'
import './ClassList.less'

const ClassList = props => {
  return (
    <Menu
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        width: 200
      }}>
      {[1, 2, 3, 4, 5].map(i => <Menu.Item>Class {i}</Menu.Item>)}
    </Menu>
  )
}

ClassList.propTypes = {}

export default ClassList
