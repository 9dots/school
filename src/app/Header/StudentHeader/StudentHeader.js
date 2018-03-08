import { Avatar, Icon, Layout } from 'antd'
import { Link } from 'react-router-dom'
import styles from 'theme/vars/vars.js'
import PropTypes from 'prop-types'
import UserMenu from '../UserMenu'
import React from 'react'

import './StudentHeader.less'

const StudentHeader = ({ profile = {}, logout, isLoaded }) => {
  return (
    <Layout className='header student-header'>
      <Layout.Sider width={styles['@sidebar-width']}>
        <Link to='/' className='logo'>
          <Icon type='rocket' size='large' />
          DOCKET
        </Link>
      </Layout.Sider>
      {isLoaded && (
        <Layout.Content key='content' style={{ textAlign: 'center' }}>
          <h2>
            <Avatar size='large' icon='user' />
            {profile.displayName}
          </h2>

          <UserMenu logout={logout} />
        </Layout.Content>
      )
      // <Layout.Sider
      //   key='sider'
      //   width={styles['@sidebar-width']}
      //   style={{ marginRight: 20 }}>
      // </Layout.Sider>
      // ]
      }
    </Layout>
  )
}

StudentHeader.propTypes = {}

export default StudentHeader
