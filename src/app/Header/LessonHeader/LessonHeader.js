import LessonControls from './LessonControls'
import { Avatar, Icon, Layout, List, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import styles from 'theme/vars/vars.js'
import UserMenu from '../../UserMenu'
import PropTypes from 'prop-types'
import React from 'react'

import './LessonHeader.less'
import { getTaskTitle } from '../../../utils'

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
  const task = progress.find(({ active }) => !!active) || {}
  console.log(progress)

  return (
    <Layout className='lesson-header'>
      <Layout.Sider width={width}>
        <h2>
          <Link to={`/class/${classId}`}>
            <Icon type='home' size='large' style={{ marginRight: 10 }} />
            {profile.displayName}
          </Link>
        </h2>
      </Layout.Sider>
      <Layout.Content>
        <Row
          type='flex'
          justify='center'
          align='middle'
          className='control-title'>
          <Avatar>{(task.index || 0) + 1}</Avatar>
          <Col>
            {/* <h3>{getTaskTitle(task)}</h3> */}
            <h4>{lesson.displayName}</h4>
          </Col>
        </Row>
      </Layout.Content>
      <Layout.Sider width={width}>
        <LessonControls
          studentId={studentId}
          progress={progress}
          lesson={lesson}
          tasks={tasks} />
      </Layout.Sider>
    </Layout>
  )
}

LessonHeader.propTypes = {}

export default LessonHeader
