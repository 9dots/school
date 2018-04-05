import { TextField, SelectField } from 'redux-form-antd'
import { Button, Form, Row, Col } from 'antd'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './LessonForm.less'

const LessonForm = ({ setEditKey, handleSubmit, onSubmit, confirmLoading }) => {
  return (
    <Form
      confirmLoading={confirmLoading}
      style={{ borderBottom: '1px solid #e8e8e8' }}>
      <Row type='flex' gutter={16}>
        <Col span={12}>
          <Form.Item label='Title'>
            <Field
              name='displayName'
              placeholder='Lesson Title...'
              component={TextField} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='Slides'>
            <Field
              name='slides'
              placeholder='Link to Slides...'
              component={TextField} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='Lesson Plan'>
            <Field
              name='lessonPlan'
              placeholder='Link to Lesson Plan...'
              component={TextField} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label='Description'>
        <Field
          name='description'
          placeholder='Description...'
          component={TextField} />
      </Form.Item>

      <Form.Item style={{ textAlign: 'right', marginTop: 38 }}>
        <Button
          style={{ marginRight: 10 }}
          disabled={confirmLoading}
          onClick={() => setEditKey(null)}>
          Cancel
        </Button>
        <Button
          type='primary'
          loading={confirmLoading}
          onClick={handleSubmit(onSubmit)}>
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

LessonForm.propTypes = {}

export default enhancer(LessonForm)
