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
  progress,
  tasks
}) => {
  const width = styles['@sidebar-width'] - 50

  return (
    <Layout className='lesson-header'>
      <Layout.Sider width={width}>
        <h2>
          <Link to={`/class/${classId}`}>
            <Icon type='left' size='large' style={{ marginRight: 10 }} />
            {lesson.displayName}
          </Link>
        </h2>
      </Layout.Sider>
      <Layout.Content style={{ textAlign: 'center' }}>
        <LessonControls
          studentId={studentId}
          progress={progress}
          lesson={lesson}
          tasks={tasks} />
      </Layout.Content>
      <Layout.Sider width={width}>
        <h2 style={{ color: 'white', marginBottom: 0, textAlign: 'right' }}>
          <Avatar icon='user' size='large' style={{ marginRight: 10 }} />
          {profile.displayName}
        </h2>
      </Layout.Sider>
    </Layout>
  )
}

LessonHeader.propTypes = {}

export default LessonHeader
