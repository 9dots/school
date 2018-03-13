import { Card, Button, Icon, Steps, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './StartLesson.less'

const StartLesson = ({ assignedLesson = {}, progress, classId, isLoaded }) => {
  if (!isLoaded) return <span />
  const { tasks = [], displayName, id, current = 0 } = assignedLesson
  return (
    <Card className='course start-lesson'>
      <h1>{displayName}</h1>
      <p>Click the button below to begin!</p>
      <Link to={`/class/${classId}/lesson/${id}/${current}`}>
        <Button size='large' type='primary' className='secondary rounded'>
          START
          <Icon type='caret-right' />
        </Button>
      </Link>
      <div>
        {tasks.map((val, i) => (
          <div
            className='dot'
            style={{ opacity: i <= current ? 1 : 0.5 }}
            key={val.id} />
        ))}
      </div>
    </Card>
  )
}

StartLesson.propTypes = {}

export default enhancer(StartLesson)
