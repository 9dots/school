import LessonEditor from './LessonEditor'
import LessonForm from './LessonForm'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import Course from '../Course'
import Header from './Header'
import { Icon, Card } from 'antd'
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
      <div className='main-col'>
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
    </div>
  )
}

const AddLesson = ({ editing, setEditKey, course }) => {
  console.log(course)
  return editing ? (
    <Card className='course lesson-editor' style={{ marginBottom: 40 }}>
      <LessonForm mode='addLesson' course={course} setEditKey={setEditKey} />
    </Card>
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
