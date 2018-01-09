// import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import React from 'react'
import './Header.less'

const Header = props => {
  return (
    <Menu className='main-nav' mode='horizontal' theme='dark'>
      <div className='logo'>
        <Icon
          type='rocket'
          size='large'
          style={{ marginRight: 10, fontSize: 16 }} />
        DOCKET
      </div>
      <Menu.Item>
        <Icon type='book' />
        Classes
      </Menu.Item>
      <Menu.Item>
        <Icon type='table' />
        Grades
      </Menu.Item>
    </Menu>
  )
}

Header.propTypes = {}

export default Header
