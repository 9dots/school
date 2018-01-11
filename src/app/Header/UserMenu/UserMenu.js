import PropTypes from 'prop-types'
import React from 'react'
import { Avatar, Dropdown, Menu, Icon } from 'antd'
import './UserMenu.less'

const UserMenu = props => {
  return (
    <span className='user-menu'>
      <Dropdown overlay={overlay} trigger={['click']}>
        <div>
          <Avatar icon='user' />
          Oscar Vanegas
        </div>
      </Dropdown>
    </span>
  )
}

const overlay = (
  <Menu>
    <Menu.Item>
      <Icon type='user' style={{ marginRight: 10 }} />
      Profile
    </Menu.Item>
    <Menu.Item>
      <Icon type='setting' style={{ marginRight: 10 }} />
      Settings
    </Menu.Item>
    <Menu.Item>
      <Icon type='logout' style={{ marginRight: 10 }} />
      Log Out
    </Menu.Item>
  </Menu>
)

UserMenu.propTypes = {}

export default UserMenu
