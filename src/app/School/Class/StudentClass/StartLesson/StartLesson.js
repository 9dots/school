import { Card, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

import './StartLesson.less'

const StartLesson = props => {
  const { assignedLesson = {}, onAssign, progress, classId } = props
  const { displayName, module: moduleId, id, tasks } = assignedLesson
  const idx = tasks.findIndex(task => task.id === progress.active)
  const current = idx === -1 ? 0 : idx

  return (
    <Card className='course start-lesson'>
      <h1>{displayName}</h1>
      <p>Click the button below to begin!</p>
      <Link to={`/class/${classId}/module/${moduleId}/lesson/${id}/${current}`}>
        <Button
          onClick={onAssign(assignedLesson, moduleId, { student: true })}
          size='large'
          type='primary'
          className='secondary rounded'>
          {parseInt(current, 10) ? 'CONTINUE' : 'START'}
          <Icon type='caret-right' />
        </Button>
      </Link>
      {/* <div style={{ maxWidth: 150, margin: '0 auto' }}>
        <Progress
          className='start-lesson-progress'
          strokeWidth={12}
          style={{ marginLeft: 18 }}
          percent={progressPercent(progress)} />
      </div> */}
    </Card>
  )
}

StartLesson.propTypes = {}

export default StartLesson
