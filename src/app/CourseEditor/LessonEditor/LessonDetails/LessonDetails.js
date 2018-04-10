import { Button, Row, Col, Tooltip, Icon } from 'antd'
import LessonForm from '../../LessonForm'
import PropTypes from 'prop-types'
import React from 'react'

import './LessonDetails.less'

const LessonDetails = ({
  lesson,
  course,
  editKey,
  setEditKey,
  handleProps
}) => {
  const { displayName, slides, lessonPlan, description, id } = lesson

  return editKey !== id ? (
    <Row type='flex' className='lesson-details'>
      <Col className='flex-grow ellipsis'>
        <div className='title'>
          <h2 style={{ marginBottom: 0, display: 'inline' }}>{displayName}</h2>
          <a href={lessonPlan} target='_blank'>
            Lesson Plan
            <Icon type='export' />
          </a>
          <a href={slides} target='_blank'>
            Slides
            <Icon type='export' />
          </a>
        </div>
        <span>{description}</span>
      </Col>
      {/* <Col>
        <Tooltip title='Sildes'>
          <Button target='_blank' href={slides} icon='file-ppt' />
        </Tooltip>
        <Tooltip title='Lesson Plan'>
          <Button target='_blank' href={lessonPlan} icon='profile' />
        </Tooltip>
      </Col> */}
      <Col className='actions'>
        <Icon type='edit' onClick={() => setEditKey(id)} />
        <Icon
          type='swap'
          style={{ transform: 'rotate(90deg)', cursor: 'move' }}
          {...handleProps} />
        <Icon type='delete' />
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
