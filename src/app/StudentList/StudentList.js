import PropTypes from 'prop-types'
import { Menu, Avatar } from 'antd'
import React from 'react'
import './StudentList.less'

const StudentList = props => {
  return (
    <Menu
      mode='vertical-right'
      fluid
      style={{
        minHeight: 'calc(100vh - 64px)',
        paddingTop: 20
      }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Menu.Item key={i}>
          <Avatar
            size='small'
            style={{ marginRight: 10, textAlign: 'center' }}
            icon='user' />
          Student {i}
        </Menu.Item>
      ))}
    </Menu>
  )
}

StudentList.propTypes = {}

export default StudentList
