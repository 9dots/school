import LessonControls from './LessonControls'
import { Avatar, Icon, Layout } from 'antd'
import { Link } from 'react-router-dom'
import styles from 'theme/vars/vars.js'
import UserMenu from '../../UserMenu'
import PropTypes from 'prop-types'
import React from 'react'

import './LessonHeader.less'

const LessonHeader = ({
  profile,
  classId,
  lessonId,
  taskNum,
  studentId,
  lesson,
  progress
}) => {
  return (
    <Layout className='lesson-header'>
      <Layout.Sider width={styles['@sidebar-width']}>
        <h2>
          <Link to={`/class/${classId}`}>
            <Icon type='left' size='large' style={{ marginRight: 10 }} />
            Back To Class
          </Link>
        </h2>
      </Layout.Sider>
      <Layout.Content style={{ textAlign: 'center' }}>
        <LessonControls
          studentId={studentId}
          lesson={lesson}
          progress={progress} />
      </Layout.Content>
      <Layout.Sider width={styles['@sidebar-width']}>
        <UserMenu
          // logout={logout}
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
