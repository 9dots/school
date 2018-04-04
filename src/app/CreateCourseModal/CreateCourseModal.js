import { TextField, TextAreaField, SelectField } from 'redux-form-antd'
import { Field, Fields } from 'redux-form'
import PropTypes from 'prop-types'
import { Modal, Form } from 'antd'
import enhancer from './enhancer'
import React from 'react'

import './CreateCourseModal.less'

const durationFields = fields => (
  <div>
    <SelectField placeholder='hours' options={[]} {...fields.unit} />
    <SelectField placeholder='3' options={[]} {...fields.time} />
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
          <Field name='tags' options={[]} component={SelectField} />
        </Form.Item>
        <Form.Item label='Grade'>
          <Field
            name='grade'
            placeholder='Select a Grade'
            options={[]}
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
