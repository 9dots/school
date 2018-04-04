import { Button, Row, Col } from 'antd'
import LessonForm from './LessonForm'
import PropTypes from 'prop-types'
import React from 'react'

import './LessonDetails.less'

const LessonDetails = ({ lesson, course, editKey, setEditKey }) => {
  const { displayName, description, id } = lesson

  return editKey !== id ? (
    <Row type='flex'>
      <Col className='flex-grow ellipsis'>
        <h2 style={{ marginBottom: 0 }}>{displayName}</h2>
        <span>{description}</span>
      </Col>
      <Col>
        <Button>Lesson Plan</Button>
        <Button style={{ margin: '0 8px' }}>Slides</Button>
        <Button type='primary' icon='edit' onClick={() => setEditKey(id)} />
      </Col>
    </Row>
  ) : (
    <LessonForm
      lesson={lesson.id}
      course={course}
      initialValues={lesson}
      setEditKey={setEditKey} />
  )
}

LessonDetails.propTypes = {}

export default LessonDetails
