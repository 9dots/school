import { TextField, TextAreaField, SelectField } from 'redux-form-antd'
import { Field, Fields } from 'redux-form'
import { Modal, Form, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './CreateCourseModal.less'

const durationFields = fields => (
  <Row gutter={8}>
    <Col span={8}>
      <TextField type='number' placeholder='30' {...fields.time} />
    </Col>
    <Col span={16}>
      <SelectField
        fluid
        placeholder='Minutes'
        options={timeUnits.map(unit => ({ label: unit, value: unit }))}
        {...fields.unit} />
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
        <Form.Item label='Tags'>
          <Field
            name='tags'
            mode='multiple'
            style={{ width: 'auto' }}
            options={tags.sort().map(tag => ({ label: tag, value: tag }))}
            component={SelectField} />
        </Form.Item>
        <Row gutter={24}>
          <Col span={9}>
            <Form.Item label='Grade'>
              <Field
                name='grade'
                placeholder='Select a Grade'
                options={grades.map(grade => ({ label: grade, value: grade }))}
                component={SelectField} />
            </Form.Item>
          </Col>
          <Col span={15}>
            <Form.Item label='Duration'>
              <Fields names={['unit', 'time']} component={durationFields} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

CreateCourseModal.propTypes = {}

export default enhancer(CreateCourseModal)

const grades = ['K', 1, 2, 3, 4, 5]
const timeUnits = ['Minutes', 'Hours', 'Days', 'Weeks', 'Months']
const tags = [
  'Computer Science',
  'Javascript',
  'World Languages',
  'Social Studies',
  'Science',
  'Mathematics',
  'Language Arts',
  'Health & PE',
  'Creative Arts',
  'Professional Development'
]
