// import PropTypes from 'prop-types'
import { Menu, Icon, Layout, Row, Col } from 'antd'
import React from 'react'
import UserMenu from './UserMenu'
import './Header.less'
import styles from 'theme/vars/vars.js'

const Header = props => {
  return (
    <Layout className='header'>
      <Layout.Sider width={styles['@sidebar-width']}>
        <div
          className='logo'
          style={{
            fontSize: '20px',
            fontWeight: 200,
            fontFamily: 'Lato',
            letterSpacing: '5px'
          }}>
          <Icon
            type='rocket'
            size='large'
            style={{ marginRight: 10, fontSize: 25, marginBottom: '-5px' }} />
          DOCKET
        </div>
      </Layout.Sider>
      <Layout.Content>
        <Menu
          className='main-nav'
          mode='horizontal'
          theme='dark'
          selectedKeys={['classes']}
          style={{ float: 'left' }}>
          <Menu.Item key='classes'>
            <Icon type='book' />
            Classes
          </Menu.Item>
          <Menu.Item>
            <Icon type='table' />
            Grades
          </Menu.Item>
          <Menu.Item>
            <Icon type='appstore-o' />
            Courses
          </Menu.Item>
        </Menu>
        <UserMenu />
      </Layout.Content>
    </Layout>
  )
}

Header.propTypes = {}

export default Header
