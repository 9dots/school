import PropTypes from 'prop-types'
import { Avatar, List, Progress } from 'antd'
import React from 'react'
import './Task.less'

const style = {
  marginRight: -22,
  border: '1px solid white'
}

const Task = props => {
  const { task, i } = props
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar>{i + 1}</Avatar>}
        title={task.displayName}
        description={task.description || 'description'} />
      <span style={{ marginRight: 30, display: 'inline-block' }}>
        {Math.round(Math.random()) ? <Avatar style={style} icon='user' /> : ''}
        {Math.round(Math.random()) ? <Avatar style={style} icon='user' /> : ''}
        {Math.round(Math.random()) ? <Avatar style={style} icon='user' /> : ''}
        {Math.round(Math.random()) ? <Avatar style={style} icon='user' /> : ''}
        {Math.round(Math.random()) ? <Avatar style={style} icon='user' /> : ''}
        {Math.round(Math.random()) ? <Avatar style={style} icon='user' /> : ''}
        {Math.round(Math.random()) ? <Avatar style={style} icon='user' /> : ''}
      </span>

      <Progress
        type='circle'
        width={32}
        percent={9 * Math.round(Math.random() * 10)} />
    </List.Item>
  )
}

Task.propTypes = {}

export default Task
