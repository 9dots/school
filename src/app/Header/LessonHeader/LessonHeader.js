import { Avatar, Icon, Layout } from 'antd'
import { Link } from 'react-router-dom'
import styles from 'theme/vars/vars.js'
import UserMenu from '../UserMenu'
import LessonControls from './LessonControls'
import PropTypes from 'prop-types'
import React from 'react'
import './LessonHeader.less'

const LessonHeader = ({
  isLoaded,
  profile,
  logout,
  classId,
  lessonId,
  taskNum
}) => {
  return (
    <Layout className='header'>
      <Layout.Sider width={styles['@sidebar-width']}>
        <Link
          to={`/class/${classId}`}
          className='logo'
          style={{ letterSpacing: 'normal' }}>
          <Icon type='left' size='large' />
          Back To Class
        </Link>
      </Layout.Sider>
      <Layout.Content style={{ textAlign: 'center' }}>
        <LessonControls
          lessonId={lessonId}
          classId={classId}
          current={taskNum} />
      </Layout.Content>
      <Layout.Sider
        width={styles['@sidebar-width']}
        style={{ marginRight: 20 }}>
        <UserMenu
          logout={logout}
          button={
            <h2 style={{ color: 'white', marginBottom: 0 }}>
              <Avatar icon='user' size='large' />
              {profile.displayName}
            </h2>
          } />
      </Layout.Sider>
    </Layout>
  )
}

LessonHeader.propTypes = {}

export default LessonHeader
