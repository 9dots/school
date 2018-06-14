import PropTypes from 'prop-types'
import Shape from './Shape'
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
    <div className={getClasses(task, multiple, number, theme)} {...rest}>
      <Shape index={task.keyTask || shape} />
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