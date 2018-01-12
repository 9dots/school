import { firebaseConnect } from 'react-redux-firebase'
import { Avatar, Dropdown, Menu, Icon } from 'antd'
import { compose, withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import React from 'react'
import './UserMenu.less'

const enhancer = compose(
  firebaseConnect(),
  withHandlers({
    logout: props => event => {
      switch (event.key) {
        case 'logout':
          return props.firebase
            .logout()
            .then(() => (window.location = window.location.origin))
        default:
          break
      }
    }
  })
)

const UserMenu = enhancer(({ logout }) => {
  const overlay = (
    <Menu onClick={logout}>
      <Menu.Item>
        <Icon type='user' style={{ marginRight: 10 }} />
        Profile
      </Menu.Item>
      <Menu.Item>
        <Icon type='setting' style={{ marginRight: 10 }} />
        Settings
      </Menu.Item>
      <Menu.Item key='logout'>
        <Icon type='logout' style={{ marginRight: 10 }} />
        Log Out
      </Menu.Item>
    </Menu>
  )
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
})

UserMenu.propTypes = {}

export default UserMenu
