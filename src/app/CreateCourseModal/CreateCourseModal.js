import PropTypes from 'prop-types'
import React from 'react'
import { Field } from 'redux-form'
import { TextField, SelectField } from 'redux-form-antd'
import { Modal, Form } from 'antd'
import enhancer from './enhancer'
import './CreateCourseModal.less'

const CreateCourseModal = ({ ...rest }) => {
  return (
    <Modal {...rest} title='Create a New Course'>
      <Form>
        <Form.Item label='Name'>
          <Field
            name='displayName'
            placeholder='Coding 1'
            component={TextField} />
        </Form.Item>
        <Form.Item label='Grade'>
          <Field
            name='grade'
            placeholder='Select a Grade'
            component={SelectField} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

CreateCourseModal.propTypes = {}

export default enhancer(CreateCourseModal)
