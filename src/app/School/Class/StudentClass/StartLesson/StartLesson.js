import { Card, Button, Icon, Steps, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import React from 'react'
import './StartLesson.less'

const StartLesson = ({ lesson, classId }) => {
  const { tasks } = lesson

  return (
    <Card className='course start-lesson'>
      <h1>{lesson.displayName}</h1>
      <p>Click the button below to begin!</p>
      <Link to={`/class/${classId}/lesson/${lesson.id}/0`}>
        <Button size='large' type='primary' className='secondary rounded'>
          START
          <Icon type='caret-right' />
        </Button>
      </Link>
      <div>{tasks.map((val, key) => <div className='dot' key={key} />)}</div>
    </Card>
  )
}

StartLesson.propTypes = {}

export default StartLesson
