import { TextField, SelectField } from 'redux-form-antd'
import { stopEvent } from '../../../utils'
import { Modal, Form } from 'antd'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './ClassModal.less'

const commonProps = {
  validate: v => (v ? '' : 'Required')
}

const grades = [
  'k',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12'
]

const ClassModal = props => (
  <span onClick={stopEvent(() => {})}>
    <Modal
      {...props}
      onCancel={props.close(props.onCancel)}
      onOk={props.handleSubmit(props.onSubmit)}
      title='Create A Class'>
      <Form>
        <Form.Item label='Name'>
          <Field
            {...commonProps}
            name='displayName'
            placeholder='Coding 1'
            component={TextField} />
        </Form.Item>
        <Form.Item label='Grade'>
          <Field
            {...commonProps}
            options={grades.map(grade => ({ label: grade, value: grade }))}
            name='grade'
            placeholder='Select a Grade'
            component={SelectField} />
        </Form.Item>
      </Form>
    </Modal>
  </span>
)

ClassModal.propTypes = {
  school: PropTypes.string.isRequired
}

export default enhancer(ClassModal)
