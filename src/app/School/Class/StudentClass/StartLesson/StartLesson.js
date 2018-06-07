import { Card, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'
import TaskDot from 'components/TaskDot'
import PropTypes from 'prop-types'
import React from 'react'

import './StartLesson.less'

const StartLesson = props => {
  const { assignedLesson = {}, assignToStudent, progress = [], classId } = props
  const { displayName, module: moduleId, id, tasks } = assignedLesson
  const current = getIndex(progress)

  return (
    <Card className='course start-lesson'>
      <h1>{displayName}</h1>
      <p>Click the button below to begin!</p>
      <Link to={`/class/${classId}/module/${moduleId}/lesson/${id}/${current}`}>
        <Button
          onClick={assignToStudent(id, moduleId)}
          size='large'
          type='primary'
          className='secondary rounded'>
          {parseInt(current, 10) ? 'CONTINUE' : 'START'}
          <Icon type='caret-right' />
        </Button>
      </Link>
      <div>
        {progress.map((task = {}, i) => (
          <TaskDot
            multiple
            task={{ ...task, ...tasks[i] }}
            key={task.task || i} />
        ))}
      </div>
    </Card>
  )
}

function getIndex (progress) {
  const idx = progress.findIndex(p => p && !!p.active) || 0
  return idx > -1 ? idx : 0
}

StartLesson.propTypes = {}

export default StartLesson
