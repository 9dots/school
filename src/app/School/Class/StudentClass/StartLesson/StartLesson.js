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
        {progress.filter(p => !!p).map((task, i) => (
          <div
            className='dot'
            style={{
              opacity: i <= current ? 1 : 0.5,
              border: task.completed ? 'red' : 'none'
            }}
            key={task.task} />
        ))}
      </div>
    </Card>
  )
}

function getIndex (progress) {
  const idx = progress.findIndex(p => !!p.active) || 0
  return idx > -1 ? idx : 0
}

StartLesson.propTypes = {}

export default enhancer(StartLesson)
