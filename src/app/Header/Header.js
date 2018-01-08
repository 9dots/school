// import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import React from 'react'
import './Header.less'

const Header = props => {
  return (
    <div>
      <Menu mode='horizontal'>
        <Menu.Item>
          <Icon type='book' />
          Classes
        </Menu.Item>
        <Menu.Item>
          <Icon type='rocket' />
          Grades
        </Menu.Item>
      </Menu>
    </div>
  )
}

Header.propTypes = {}

export default Header
