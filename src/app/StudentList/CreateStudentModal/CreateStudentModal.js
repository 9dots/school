import { TextField } from 'redux-form-antd'
import { isEmail } from '../../../utils'
import { Modal, Form } from 'antd'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './CreateStudentModal.less'

const commonProps = {
  validate: v => (v ? '' : 'Required')
}

const email = value => (isEmail(value) ? 'Invalid email address' : undefined)

const CreateStudentModal = props => {
  const displayName = props.class && props.class.displayName
  return (
    <Modal
      {...props}
      onCancel={props.close(props.onCancel)}
      onOk={props.handleSubmit(props.onSubmit)}
      confirmLoading={props.confirmLoading}
      title={'Add Student to ' + displayName}>
      <Form onSubmit={props.handleSubmit(props.onSubmit)}>
        <Form.Item label='First'>
          <Field
            {...commonProps}
            name='name.given'
            placeholder='Michael'
            component={TextField} />
        </Form.Item>
        <Form.Item label='Last'>
          <Field
            {...commonProps}
            name='name.family'
            placeholder='Scott'
            component={TextField} />
        </Form.Item>
        <Form.Item label='Student ID'>
          <Field
            {...commonProps}
            name='studentId'
            placeholder='abc123'
            component={TextField} />
        </Form.Item>
        <Form.Item label='Email (optional)'>
          <Field
            // {...commonProps}
            // validate={v => (isEmail(v) ? 'Invalid Email' : undefined)}
            validate={email}
            type='email'
            name='email'
            placeholder='student@email.com'
            component={TextField} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

CreateStudentModal.propTypes = {}

export default enhancer(CreateStudentModal)
