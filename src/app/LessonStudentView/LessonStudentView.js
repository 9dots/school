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
  teacherView,
  isLoaded,
  profile,
  taskNum,
  tasks
}) => {
  if (!isLoaded) return <Loading />
  return (
    <Layout className='lesson-view'>
      <Route
        path='/class/:classId/module/:moduleId/lesson/:lessonId/:taskNum/:studentId?'
        render={({ match: { params } }) => (
          <Layout.Header style={{ padding: '0 20px' }}>
            <LessonHeader
              progress={progress}
              profile={profile}
              lesson={assignedLesson}
              tasks={tasks}
              {...params} />
          </Layout.Header>
        )} />
      <Layout.Content>
        <iframe src={getView(progress[taskNum], teacherView)} />
      </Layout.Content>
    </Layout>
  )
}

function getView (task, teacherView) {
  return task.instance || task.url
}

LessonStudentView.propTypes = {}

export default enhancer(LessonStudentView)
