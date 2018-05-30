import { Avatar, Icon, List } from 'antd'
import { Link } from 'react-router-dom'
import TaskDot from 'components/TaskDot'
import { getTaskIcon } from 'utils/data'
import PropTypes from 'prop-types'
import React from 'react'
import './Tasks.less'

const Tasks = ({ lesson: { tasks = [], id }, moduleId, classId, student }) => (
  <List className='task-list'>
    {(tasks || []).map((task, i) => (
      <List.Item key={id + '-' + i}>
        <List.Item.Meta
          avatar={<TaskDot tasks={tasks} task={task} number={i + 1} />}
          title={
            <span>
              <Icon type={getTaskIcon(task.type)} />
              {task.displayName}
            </span>
          }
          description={task.description} />
        {student ? (
          <Link
            to={`/class/${classId}/module/${moduleId}/lesson/${id}/${i}`}
            className='extra'>
            <Icon type='caret-right' />
            Play
          </Link>
        ) : (
          <Link target='_blank' to={task.url} className='extra'>
            <Icon type='eye-o' />
            Preview
          </Link>
        )}
      </List.Item>
    ))}
  </List>
)

Tasks.propTypes = {}

export default Tasks
