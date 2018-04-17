import { TextField } from 'redux-form-antd'
import { Modal, Form, Row, Col } from 'antd'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import { isEmail } from 'utils'
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
      destroyOnClose
      onCancel={props.close(props.onCancel)}
      onOk={props.handleSubmit(props.onSubmit)}
      confirmLoading={props.confirmLoading}
      title={'Add Student to ' + displayName}>
      <Form onSubmit={props.handleSubmit(props.onSubmit)}>
        <Item label='Full Name'>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item>
                <Field
                  {...commonProps}
                  name='name.given'
                  placeholder='First'
                  component={TextField} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Field
                  {...commonProps}
                  name='name.family'
                  placeholder='Last'
                  component={TextField} />
              </Form.Item>
            </Col>
          </Row>
        </Item>
        <Item label='Student ID'>
          <Field
            {...commonProps}
            name='studentId'
            placeholder='abc123'
            component={TextField} />
        </Item>
        <Item label='Email (optional)'>
          <Field
            // {...commonProps}
            // validate={v => (isEmail(v) ? 'Invalid Email' : undefined)}
            validate={email}
            type='email'
            name='email'
            placeholder='student@email.com'
            component={TextField} />
        </Item>
      </Form>
    </Modal>
  )
}

const Item = props => <Form.Item {...itemLayout} {...props} />

const itemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 }
  }
}

CreateStudentModal.propTypes = {}

export default enhancer(CreateStudentModal)
