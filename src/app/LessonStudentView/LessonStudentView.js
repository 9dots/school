import LessonHeader from '../Header/LessonHeader'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import { Layout } from 'antd'
import Loading from '../Loading'
import React from 'react'

import './LessonStudentView.less'

const LessonStudentView = ({
  assignedLesson = {},
  progress = {},
  profile,
  taskNum,
  isLoaded
}) => {
  if (!isLoaded) return <Loading />
  return (
    <Layout className='lesson-view'>
      <Route
        path='/class/:classId/lesson/:lessonId/:taskNum'
        render={({ match: { params } }) => (
          <Layout.Header style={{ padding: '0 20px' }}>
            <LessonHeader
              progress={progress}
              profile={profile}
              lesson={assignedLesson}
              {...params} />
          </Layout.Header>
        )} />
      <Layout.Content>
        <iframe src={progress[taskNum].instance || progress[taskNum].url} />
      </Layout.Content>
    </Layout>
  )
}

LessonStudentView.propTypes = {}

export default enhancer(LessonStudentView)
