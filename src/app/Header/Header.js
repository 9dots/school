import { Menu, Icon, Layout, Avatar } from 'antd'
import styles from 'theme/vars/vars.js'
import { Link } from 'react-router-dom'
import UserMenu from '../UserMenu'
import React from 'react'
import './Header.less'

const Header = ({ location, profile = {}, logout }) => {
  const active = location.pathname.split('/')[1]

  return (
    <Layout className='header'>
      <Layout.Sider width={styles['@sidebar-width']}>
        <Link to='/' className='logo'>
          <Icon type='rocket' size='large' />
          DOCKET
        </Link>
      </Layout.Sider>
      <Layout.Content>
        <Menu
          style={{ float: 'left' }}
          selectedKeys={[active]}
          className='main-nav'
          mode='horizontal'
          theme='dark'>
          <Menu.Item key='class'>
            <Link to='/'>
              <Icon type='book' />
              Classes
            </Link>
          </Menu.Item>
          <Menu.Item key='courses'>
            <Link to='/courses'>
              <Icon type='appstore-o' />
              Courses
            </Link>
          </Menu.Item>
        </Menu>
        <UserMenu
          logout={logout}
          button={
            <div>
              <Avatar icon='user' />
              {profile.displayName}
            </div>
          } />
      </Layout.Content>
    </Layout>
  )
}

Header.propTypes = {}

export default Header
