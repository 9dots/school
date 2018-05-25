import { Card, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loading from 'app/Loading'
import enhancer from './enhancer'
import React from 'react'

import './StartLesson.less'

const StartLesson = props => {
  const {
    assignedLesson = {},
    assignToStudent,
    progress,
    classId,
    isLoaded
  } = props
  if (!isLoaded) return <Loading />
  const prog = progress || []
  const { displayName, module: moduleId, id } = assignedLesson
  const current = getIndex(prog)

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
        {prog.map((task = {}, i) => (
          <div className={getClasses(task)} key={task.task || i} />
        ))}
      </div>
    </Card>
  )
}

function getIndex (progress) {
  const idx = progress.findIndex(p => p && !!p.active) || 0
  return idx > -1 ? idx : 0
}

function getClasses ({ completed, active, started }) {
  let name = 'dot'
  if (completed) name += ' completed'
  if (started) name += ' started'
  if (active) name += ' active'
  return name
}

StartLesson.propTypes = {}

export default enhancer(StartLesson)
