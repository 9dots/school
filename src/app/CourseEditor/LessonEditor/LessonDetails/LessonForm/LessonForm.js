import { TextField, SelectField } from 'redux-form-antd'
import { Button, Form, Row, Col } from 'antd'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './LessonForm.less'

const LessonForm = ({ setEditKey, handleSubmit, onSubmit, confirmLoading }) => {
  return (
    <Form confirmLoading={confirmLoading}>
      <Form.Item>
        <Field
          name='displayName'
          placeholder='Lesson Title...'
          component={TextField} />
      </Form.Item>
      <Form.Item>
        <Field
          name='description'
          placeholder='Description...'
          component={TextField} />
      </Form.Item>
      <Row type='flex'>
        <Col>
          <Form.Item>
            <Field
              name='slides'
              placeholder='Link to Slides...'
              component={TextField} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Field
              name='lessonPlan'
              placeholder='Link to Lesson Plan...'
              component={TextField} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
          type='primary'
          loading={confirmLoading}
          onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
        <Button
          type='secondary'
          disabled={confirmLoading}
          onClick={() => setEditKey(null)}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  )
}

LessonForm.propTypes = {}

export default enhancer(LessonForm)
