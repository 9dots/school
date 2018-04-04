import PropTypes from 'prop-types'
import React from 'react'
import { Card, List } from 'antd'
import LessonDetails from './LessonDetails'
import TaskDetails from './TaskDetails'
import enhancer from './enhancer'
import './LessonEditor.less'

const LessonEditor = ({ lesson, toggleMode, editKey, setEditKey }) => {
  const { tasks = [] } = lesson
  return (
    <Card className='course' bordered={false} style={{ borderRadius: 0 }}>
      <LessonDetails
        editKey={editKey}
        setEditKey={setEditKey}
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
  )
}

LessonEditor.propTypes = {}

export default enhancer(LessonEditor)
