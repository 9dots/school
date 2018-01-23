import { firebaseConnect } from 'react-redux-firebase'
import { Avatar, Dropdown, Menu, Icon } from 'antd'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import './UserMenu.less'

const enhancer = compose(
  firebaseConnect(),
  connect(({ firebase: { profile } }) => ({
    profile
  })),
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

const UserMenu = enhancer(({ logout, profile }) => {
  const overlay = (
    <Menu onClick={logout} style={{ minWidth: 150 }}>
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
          {profile.displayName}
        </div>
      </Dropdown>
    </span>
  )
})

UserMenu.propTypes = {}

export default UserMenu
