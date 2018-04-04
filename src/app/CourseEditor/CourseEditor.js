import LessonEditor from './LessonEditor'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import Course from '../Course'
import Header from './Header'
import { Icon } from 'antd'
import React from 'react'
import './CourseEditor.less'

const CourseEditor = ({ course = {}, setEditKey, editKey, setMode, mode }) => {
  const { lessons = [] } = course

  return (
    <div>
      <Header course={course} setMode={setMode} mode={mode} />
      {mode === 'edit' ? (
        <span>
          {lessons.map(lesson => (
            <LessonEditor
              setEditKey={setEditKey}
              editKey={editKey}
              key={lesson.id}
              lesson={lesson} />
          ))}
          <div className='add-section' style={{ padding: 40, fontSize: 16 }}>
            <Icon type='plus-circle' style={{ marginRight: 10 }} />
            Add a Lesson
          </div>
        </span>
      ) : (
        <Course course={course} preview />
      )}
    </div>
  )
}

CourseEditor.propTypes = {}

export default enhancer(CourseEditor)
