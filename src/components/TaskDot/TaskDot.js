import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import React from 'react'
import './TaskDot.less'

const shapes = ['diamond', 'star', 'triangle', 'square']

const TaskDot = ({
  task,
  number,
  multiple,
  theme,
  size,
  style = {},
  tasks = []
}) => {
  const shapeIndex =
    tasks.filter(t => t.keyTask).findIndex(t => t.id === task.id) %
    shapes.length

  const numSize = parseInt(size, 10)
  const sizeObj = size
    ? {
      height: numSize,
      width: numSize,
      lineHeight: numSize + 'px',
      fontSize: Math.ceil(numSize / 2) + 'px'
    }
    : {}

  return (
    <div
      className={getClasses(task, multiple, number, theme)}
      style={{
        ...sizeObj,
        ...style
      }}>
      <div className={`shape border ${shapes[shapeIndex]}`} />
      <div className={`shape ${shapes[shapeIndex]}`} />
      {number && <div className='number'>{number}</div>}
    </div>
  )
}

function getClasses (
  { completed, active, started, keyTask },
  multiple,
  number,
  theme
) {
  let name = 'task-dot'
  if (completed) name += ' completed'
  if (multiple) name += ' multiple'
  if (number) name += ' has-number'
  if (keyTask) name += ' key-task'
  if (started) name += ' started'
  if (theme) name += ` ${theme}`
  if (active) name += ' active'

  return name
}

TaskDot.propTypes = {}

export default TaskDot
