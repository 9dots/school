import { Card, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './StartLesson.less'

const StartLesson = ({ assignedLesson = {}, progress, classId, isLoaded }) => {
  if (!isLoaded) return <span />
  const { displayName, id } = assignedLesson
  const current = getIndex(progress)

  return (
    <Card className='course start-lesson'>
      <h1>{displayName}</h1>
      <p>Click the button below to begin!</p>
      <Link to={`/class/${classId}/lesson/${id}/${current}`}>
        <Button size='large' type='primary' className='secondary rounded'>
          {parseInt(current, 10) ? 'CONTINUE' : 'START'}
          <Icon type='caret-right' />
        </Button>
      </Link>
      <div>
        {progress.map((task = {}, i) => (
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
