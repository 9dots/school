import { Avatar, Icon, List } from 'antd'
import { Link } from 'react-router-dom'
import { getTaskIcon } from 'utils/data'
import PropTypes from 'prop-types'
import React from 'react'
import './Tasks.less'

const Tasks = ({ lesson: { tasks = [], id }, moduleId, classId, student }) => (
  <List className='task-list'>
    {(tasks || []).map(({ displayName, description, url, type }, i) => (
      <List.Item key={id + '-' + i}>
        <List.Item.Meta
          avatar={<Avatar size='small'>{i + 1}</Avatar>}
          title={
            <span>
              <Icon type={getTaskIcon(type)} />
              {displayName}
            </span>
          }
          description={description} />
        {student ? (
          <Link
            to={`/class/${classId}/module/${moduleId}/lesson/${id}/${i}`}
            className='extra'>
            <Icon type='caret-right' />
            Play
          </Link>
        ) : (
          <Link target='_blank' to={url} className='extra'>
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
