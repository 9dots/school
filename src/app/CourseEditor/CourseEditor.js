import PropTypes from 'prop-types'
import enhancer from './enhancer'
import Header from './Header'
import LessonEditor from './LessonEditor'
import { Icon } from 'antd'
import React from 'react'
import './CourseEditor.less'

const CourseEditor = ({ course = {} }) => {
  const { lessons = [] } = course
  console.log(lessons)
  return (
    <span>
      <Header course={course} />
      {lessons.map(lesson => <LessonEditor key={lesson.id} lesson={lesson} />)}
      <div>
        <Icon type='add-circle' />
      </div>
    </span>
  )
}

CourseEditor.propTypes = {}

export default enhancer(CourseEditor)
