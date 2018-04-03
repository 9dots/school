import PropTypes from 'prop-types'
import enhancer from './enhancer'
import Header from './Header'
import LessonEditor from './LessonEditor'
import { Icon } from 'antd'
import React from 'react'
import './CourseEditor.less'

const CourseEditor = ({ course = {}, setEditKey, editKey }) => {
  const { lessons = [] } = course

  return (
    <div style={{ padding: '0 50px' }}>
      <Header course={course} />
      {lessons.map(lesson => (
        <LessonEditor
          setEditKey={setEditKey}
          editKey={editKey}
          key={lesson.id}
          lesson={lesson} />
      ))}
      <div>
        <Icon type='plus-circle' />
      </div>
    </div>
  )
}

CourseEditor.propTypes = {}

export default enhancer(CourseEditor)
