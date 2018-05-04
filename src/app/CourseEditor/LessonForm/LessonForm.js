import Field, { TextField } from 'components/Field'
import { Button, Form, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './LessonForm.less'

const LessonForm = props => {
  const { mode, setEditKey, handleSubmit, confirmLoading, ...rest } = props
  return (
    <Form
      style={{
        borderBottom: mode === 'updateLesson' ? '1px solid #e8e8e8' : ''
      }}>
      <Row type='flex' gutter={16}>
        <Col span={12}>
          <Form.Item label='Title'>
            <Field
              {...rest}
              name='displayName'
              placeholder='Lesson Title...'
              component={TextField} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='Slides'>
            <Field
              {...rest}
              name='slides'
              placeholder='Link to Slides...'
              component={TextField} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label='Lesson Plan'>
            <Field
              {...rest}
              name='lessonPlan'
              placeholder='Link to Lesson Plan...'
              component={TextField} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label='Description'>
        <Field
          {...rest}
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
        <Button type='primary' loading={confirmLoading} onClick={handleSubmit}>
          {mode === 'addLesson' ? 'Create' : 'Save'}
        </Button>
      </Form.Item>
    </Form>
  )
}

LessonForm.propTypes = {
  mode: PropTypes.string.isRequired
}

export default enhancer(LessonForm)
