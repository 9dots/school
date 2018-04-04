import PropTypes from 'prop-types'
import React from 'react'
import { Card, List, Icon } from 'antd'
import LessonDetails from './LessonDetails'
import TaskDetails from './TaskDetails'
import enhancer from './enhancer'
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
                setEditKey={setEditKey} />
            </List.Item>
          )} />
      </Card>
      <div className='add-section' style={{ borderTopColor: 'transparent' }}>
        <Icon type='plus-circle' style={{ marginRight: 10 }} />Add a Task
      </div>
    </span>
  )
}

LessonEditor.propTypes = {}

export default enhancer(LessonEditor)
