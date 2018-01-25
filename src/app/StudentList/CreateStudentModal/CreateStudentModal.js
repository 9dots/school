import { TextField } from 'redux-form-antd'
import { Modal, Form, Button } from 'antd'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './CreateStudentModal.less'

const commonProps = {
  validate: v => (v ? '' : 'Required')
}

const CreateStudentModal = props => {
  const displayName = props.class && props.class.displayName
  return (
    <Modal
      {...props}
      onOk={props.handleSubmit(props.onSubmit)}
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
        <button style={{ display: 'none' }} />
      </Form>
    </Modal>
  )
}

CreateStudentModal.propTypes = {}

export default enhancer(CreateStudentModal)
