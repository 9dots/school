import LessonHeader from '../Header/LessonHeader'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
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
    <div className='lesson-view'>
      <Route
        path='/class/:classId/lesson/:lessonId/:taskNum'
        render={({ match: { params } }) => (
          <LessonHeader profile={profile} lesson={assignedLesson} {...params} />
        )} />
      <iframe src={progress[taskNum].instance} />
    </div>
  )
}

LessonStudentView.propTypes = {}

export default enhancer(LessonStudentView)
