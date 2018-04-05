import LessonDetails from './LessonDetails'
import TaskDetails from './TaskDetails'
import PropTypes from 'prop-types'
import { Card, List, Icon } from 'antd'
import enhancer from './enhancer'
import AddTask from './AddTask'
import React from 'react'
import './LessonEditor.less'

const LessonEditor = ({ lesson, course, toggleMode, editKey, setEditKey }) => {
  const { tasks = [] } = lesson
  const editing = editKey === lesson.id + 'addTask'
  return (
    <span>
      <Card className='course lesson-editor' bordered={false}>
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
        {editing && (
          <AddTask
            editing={editKey === lesson.id + 'addTask'}
            setEditKey={setEditKey}
            course={course}
            lesson={lesson.id} />
        )}
      </Card>
      {!editing && <AddTaskButton lesson={lesson.id} setEditKey={setEditKey} />}
    </span>
  )
}

const AddTaskButton = ({ editing, lesson, setEditKey }) => (
  <div
    onClick={() => setEditKey(lesson + 'addTask')}
    className='add-section'
    style={{ borderTopColor: 'transparent' }}>
    <Icon type='plus-circle' style={{ marginRight: 10 }} />Add a Task
  </div>
)

LessonEditor.propTypes = {}

export default enhancer(LessonEditor)
