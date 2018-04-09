import { Button, Row, Col, Tooltip } from 'antd'
import LessonForm from '../../LessonForm'
import PropTypes from 'prop-types'
import React from 'react'

import './LessonDetails.less'

const LessonDetails = ({ lesson, course, editKey, setEditKey }) => {
  const { displayName, slides, lessonPlan, description, id } = lesson

  return editKey !== id ? (
    <Row type='flex'>
      <Col className='flex-grow ellipsis'>
        <h2 style={{ marginBottom: 0 }}>{displayName}</h2>
        <span>{description}</span>
      </Col>
      <Col>
        <Tooltip title='Sildes'>
          <Button target='_blank' href={slides} icon='file-ppt' />
        </Tooltip>
        <Tooltip title='Lesson Plan'>
          <Button
            target='_blank'
            href={lessonPlan}
            style={{ margin: '0 8px' }}
            icon='profile' />
        </Tooltip>
        <Tooltip title='Edit'>
          <Button type='primary' icon='edit' onClick={() => setEditKey(id)} />
        </Tooltip>
      </Col>
    </Row>
  ) : (
    <LessonForm
      mode='updateLesson'
      lesson={lesson.id}
      course={course}
      initialValues={lesson}
      setEditKey={setEditKey} />
  )
}

LessonDetails.propTypes = {}

export default LessonDetails
