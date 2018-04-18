import { TextField, TextAreaField, SelectField } from 'redux-form-antd'
import { grades, tags, timeUnits } from 'utils/data'
import { Modal, Form, Row, Col } from 'antd'
import { Field, Fields } from 'redux-form'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './CreateCourseModal.less'

const durationFields = fields => (
  <Row gutter={8}>
    <Col span={8}>
      <TextField type='number' placeholder='30' {...fields.duration.time} />
    </Col>
    <Col span={16}>
      <SelectField
        fluid
        placeholder='Minutes'
        options={timeUnits.map(unit => ({ label: unit, value: unit }))}
        {...fields.duration.unit} />
    </Col>
  </Row>
)

const CreateCourseModal = props => {
  const { close, onCancel, onSubmit, handleSubmit, ...rest } = props

  const maxLength = 150

  return (
    <Modal
      className='create-course-modal'
      {...rest}
      onCancel={close(onCancel)}
      onOk={handleSubmit(onSubmit)}
      title='Create a New Course'>
      <Form>
        <Form.Item label='Title'>
          <Field
            name='displayName'
            placeholder='Enter your title here...'
            component={TextField} />
        </Form.Item>
        <Form.Item label='Description'>
          <Field
            id='course-description'
            name='description'
            rows={3}
            maxLength={maxLength}
            placeholder='A little bit about this course...'
            component={TextAreaField} />
        </Form.Item>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label='Grade'>
              <Field
                name='grade'
                placeholder='Select a Grade'
                options={grades.map(grade => grade)}
                component={SelectField} />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label='Tags'>
              <Field
                name='tags'
                mode='multiple'
                style={{ width: 'auto' }}
                multiple
                placeholder='Javascript'
                options={tags.map(tag => ({ ...tag, value: tag.id }))}
                component={SelectField} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={16}>
            <Form.Item label='Duration'>
              <Fields
                names={['duration.unit', 'duration.time']}
                component={durationFields} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

CreateCourseModal.propTypes = {}

export default enhancer(CreateCourseModal)
