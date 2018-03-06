import { Avatar, Icon, Layout, Button } from 'antd'
import { Link } from 'react-router-dom'
import styles from 'theme/vars/vars.js'
import PropTypes from 'prop-types'
import UserMenu from '../UserMenu'
import React from 'react'

import './StudentHeader.less'

const StudentHeader = ({ profile = {}, logout }) => {
  return (
    <Layout className='header'>
      <Layout.Sider width={styles['@sidebar-width']}>
        <Link to='/' className='logo'>
          <Icon type='rocket' size='large' />
          DOCKET
        </Link>
      </Layout.Sider>
      <Layout.Content>
        <div>{profile.displayName}</div>
        <UserMenu logout={logout} />
      </Layout.Content>
    </Layout>
  )
}

StudentHeader.propTypes = {}

export default StudentHeader
