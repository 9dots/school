import { Dropdown, Menu, Icon, Button } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './UserMenu.less'

const UserMenu = ({
  menuClick,
  profile,
  button,
  overlayStyle = {},
  isTeacher,
  ...rest
}) => {
  const overlay = (
    <Menu onClick={menuClick} style={{ minWidth: 150, ...overlayStyle }}>
      {isTeacher && [
        <Menu.Item key='library'>
          <Link to='/library'>
            <Icon type='book' style={{ marginRight: 10 }} />
            My Library
          </Link>
        </Menu.Item>,
        <Menu.Item key='settings'>
          <Icon type='setting' style={{ marginRight: 10 }} />
          Settings
        </Menu.Item>
      ]}
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

export default enhancer(UserMenu)
