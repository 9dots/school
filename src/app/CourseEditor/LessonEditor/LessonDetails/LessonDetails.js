import PropTypes from 'prop-types'
import React from 'react'
import { Button, Row, Col, Form } from 'antd'
import { Field } from 'redux-form'
import { TextField, SelectField } from 'redux-form-antd'

import './LessonDetails.less'

const LessonDetails = ({ lesson, editKey, setEditKey }) => {
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
    <i>
      Form Goes Here
      <Button type='primary' onClick={() => setEditKey(null)}>
        Save
      </Button>
    </i>
  )
}

LessonDetails.propTypes = {}

export default LessonDetails
