import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import React from 'react'
import './TaskDot.less'

const TaskDot = ({ size = 'small', task = {}, number, ...rest }) => {
  return (
    <Avatar size={size} className={getClasses(task, ...rest)} {...rest}>
      {number !== undefined ? number : ''}
    </Avatar>
  )
}

function getClasses ({ completed, active, started }, multiple, number, theme) {
  let name = 'task-dot'
  if (completed) name += ' completed'
  if (multiple) name += ' multiple'
  if (number) name += ' has-number'
  if (started) name += ' started'
  if (theme) name += ` ${theme}`
  if (active) name += ' active'

  return name
}

TaskDot.propTypes = {}

export default TaskDot
