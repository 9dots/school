import PropTypes from 'prop-types'
import Shape from './Shape'
import { Avatar } from 'antd'
import React from 'react'
import './TaskDot.less'

const TaskDot = ({
  task = {},
  number,
  multiple,
  theme,
  shape = 0,
  ...rest
}) => {
  return (
    <Avatar
      size='small'
      className={getClasses(task, multiple, number, theme)}
      {...rest}>
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
