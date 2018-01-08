// import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import React from 'react'
import './ClassList.less'

const ClassList = props => {
  return (
    <Menu>
      <Menu.Item>
        <Icon type='book' />
        Classes
      </Menu.Item>
      <Menu.Item>
        <Icon type='rocket' />
        Grades
      </Menu.Item>
    </Menu>
  )
}

ClassList.propTypes = {}

export default ClassList
