import { Menu, Icon, Layout } from 'antd'
import { Link } from 'react-router-dom'
import UserMenu from './UserMenu'
import React from 'react'
import './Header.less'
import styles from 'theme/vars/vars.js'

const Header = props => {
  return (
    <Layout className='header'>
      <Layout.Sider width={styles['@sidebar-width']}>
        <Link
          to='/'
          className='logo'
          style={{
            fontSize: '20px',
            fontWeight: 200,
            display: 'block',
            fontFamily: 'Lato',
            letterSpacing: '5px'
          }}>
          <Icon
            type='rocket'
            size='large'
            style={{ marginRight: 10, fontSize: 25, marginBottom: '-5px' }} />
          DOCKET
        </Link>
      </Layout.Sider>
      <Layout.Content>
        <Menu
          className='main-nav'
          mode='horizontal'
          theme='dark'
          selectedKeys={['classes']}
          style={{ float: 'left' }}>
          <Menu.Item key='classes'>
            <Link to='/'>
              <Icon type='book' />
              Classes
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Icon type='table' />
            Grades
          </Menu.Item>
          <Menu.Item>
            <Link to='/courses'>
              <Icon type='appstore-o' />
              Courses
            </Link>
          </Menu.Item>
        </Menu>
        <UserMenu />
      </Layout.Content>
    </Layout>
  )
}

Header.propTypes = {}

export default Header
