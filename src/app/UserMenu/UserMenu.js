import { Dropdown, Menu, Icon, Button } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import './UserMenu.less'

const UserMenu = ({ logout, profile, button, overlayStyle = {}, ...rest }) => {
  const overlay = (
    <Menu onClick={logout} style={{ minWidth: 150, ...overlayStyle }}>
      {/* <Menu.Item>
        <Icon type='user' style={{ marginRight: 10 }} />
        Profile
      </Menu.Item> */}
      <Menu.Item>
        <Link to='/library'>
          <Icon type='book' style={{ marginRight: 10 }} />
          My Library
        </Link>
      </Menu.Item>
      {/* <Menu.Item>
        <Icon type='setting' style={{ marginRight: 10 }} />
        Settings
      </Menu.Item> */}
      <Menu.Item key='logout'>
        <Icon type='logout' style={{ marginRight: 10 }} />
        Log Out
      </Menu.Item>
    </Menu>
  )
  return (
    <span className='user-menu'>
      <Dropdown overlay={overlay} trigger={['click']}>
        {button || (
          <Button icon='ellipsis' ghost className='rot90' shape='circle' />
        )}
      </Dropdown>
    </span>
  )
}

UserMenu.propTypes = {}

export default UserMenu
