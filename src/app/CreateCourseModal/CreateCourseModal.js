import { TextField, TextAreaField, SelectField } from 'redux-form-antd'
import { Field, Fields } from 'redux-form'
import PropTypes from 'prop-types'
import { Modal, Form } from 'antd'
import enhancer from './enhancer'
import React from 'react'

import './CreateCourseModal.less'

const durationFields = fields => (
  <div>
    <TextField placeholder='3' {...fields.time} />
    <SelectField
      placeholder='Hours'
      options={timeUnits.map(unit => ({ label: unit, value: unit }))}
      {...fields.unit} />
  </div>
)

const CreateCourseModal = props => {
  const { close, onCancel, onSubmit, handleSubmit, ...rest } = props
  return (
    <Modal
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
            name='description'
            placeholder='A little bit about this course...'
            component={TextAreaField} />
        </Form.Item>
        <Form.Item label='Tags'>
          <Field
            name='tags'
            mode='multiple'
            options={tags.map(tag => ({ label: tag, value: tag }))}
            component={SelectField} />
        </Form.Item>
        <Form.Item label='Grade'>
          <Field
            name='grade'
            placeholder='Select a Grade'
            options={grades.map(grade => ({ label: grade, value: grade }))}
            component={SelectField} />
        </Form.Item>
        <Form.Item label='Duration'>
          <Fields names={['unit', 'time']} component={durationFields} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

CreateCourseModal.propTypes = {}

export default enhancer(CreateCourseModal)

const tags = ['Science', 'Math', 'Taco', 'Salad', 'Rice']
const grades = ['K', 1, 2, 3, 4, 5]
const timeUnits = ['Minutes', 'Hours', 'Days', 'Weeks', 'Months']
