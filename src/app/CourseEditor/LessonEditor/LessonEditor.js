import LessonDetails from './LessonDetails'
import TaskDetails from './TaskDetails'
import PropTypes from 'prop-types'
import { Card, List } from 'antd'
import enhancer from './enhancer'
import AddTask from './AddTask'
import React from 'react'
import './LessonEditor.less'

const LessonEditor = ({ lesson, course, toggleMode, editKey, setEditKey }) => {
  const { tasks = [] } = lesson
  return (
    <span>
      <Card
        className='course'
        bordered={false}
        style={{ borderRadius: 0, marginBottom: 0 }}>
        <LessonDetails
          editKey={editKey}
          setEditKey={setEditKey}
          course={course}
          lesson={lesson} />
        <br />
        <List
          dataSource={tasks}
          renderItem={task => (
            <List.Item className='task-details'>
              <TaskDetails
                task={task}
                editKey={editKey}
                course={course}
                lesson={lesson.id}
                setEditKey={setEditKey} />
            </List.Item>
          )} />
      </Card>
      <AddTask
        editing={editKey === lesson.id + 'addTask'}
        setEditKey={setEditKey}
        course={course}
        lesson={lesson.id} />
    </span>
  )
}

LessonEditor.propTypes = {}

export default enhancer(LessonEditor)
