// import PropTypes from 'prop-types'
import { Menu, Icon, Layout, Row, Col } from 'antd'
import React from 'react'
import './Header.less'

const Header = props => {
  return (
    <Layout className='header'>
      <Layout.Sider width={230}>
        {/* <Col span={4} lg={6} xl={5} xxl={4}> */}
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
        {/* <Col span={20} lg={18} xl={19} xxl={20}> */}
        <Menu className='main-nav' mode='horizontal' theme='dark'>
          <Menu.Item>
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
        {/* </Col> */}
      </Layout.Content>
    </Layout>
  )
}

Header.propTypes = {}

export default Header
