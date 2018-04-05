import LessonEditor from './LessonEditor'
import LessonForm from './LessonForm'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import Course from '../Course'
import Header from './Header'
import { Icon } from 'antd'
import React from 'react'
import './CourseEditor.less'

const CourseEditor = ({
  course = {},
  courseId,
  setEditKey,
  editKey,
  setMode,
  mode
}) => {
  const { lessons = [] } = course

  return (
    <div>
      <Header course={course} setMode={setMode} mode={mode} />
      {mode === 'edit' ? (
        <span>
          {lessons.map(lesson => (
            <LessonEditor
              setEditKey={setEditKey}
              course={courseId}
              editKey={editKey}
              key={lesson.id}
              lesson={lesson} />
          ))}
          <AddLesson
            course={courseId}
            setEditKey={setEditKey}
            editing={editKey === 'addLesson'} />
        </span>
      ) : (
        <Course course={course} preview />
      )}
    </div>
  )
}

const AddLesson = ({ editing, setEditKey, course }) => {
  console.log(course)
  return editing ? (
    <div className='add-section'>
      <LessonForm mode='addLesson' course={course} setEditKey={setEditKey} />
    </div>
  ) : (
    <div
      onClick={() => setEditKey('addLesson')}
      className='add-section'
      style={{ padding: 40, fontSize: 16 }}>
      <Icon type='plus-circle' style={{ marginRight: 10 }} />
      Add a Lesson
    </div>
  )
}

CourseEditor.propTypes = {}

export default enhancer(CourseEditor)
