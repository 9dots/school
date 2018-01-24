import { Modal, Form, AutoComplete } from 'antd'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './AddStudentModal.less'

const commonProps = {
  validate: v => (v ? '' : 'Required')
}

const AddStudentModal = props => {
  console.log(props)
  return (
    <Modal
      {...props}
      onOk={props.handleSubmit(props.onSubmit)}
      title='Class Modal'>
      <Form>
        <Form.Item label='First'>
          <Field
            {...commonProps}
            name='name.given'
            placeholder='Michael'
            component={AutoComplete} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

AddStudentModal.propTypes = {}

export default enhancer(AddStudentModal)
