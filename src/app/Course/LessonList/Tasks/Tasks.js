import { Avatar, Icon, List } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import './Tasks.less'

const Tasks = ({ lesson: { tasks = [], id }, classId, student }) => (
  <List className='task-list'>
    {(tasks || []).map(({ displayName, description, url }, i) => (
      <List.Item key={id + '-' + i}>
        <List.Item.Meta
          avatar={<Avatar size='small'>{i + 1}</Avatar>}
          title={displayName}
          description={description} />
        {student ? (
          <Link to={`/class/${classId}/lesson/${id}/${i}`} className='extra'>
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
