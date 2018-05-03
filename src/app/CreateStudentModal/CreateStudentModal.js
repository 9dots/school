import { Modal, Form, Row, Col } from 'antd'
import Field, { TextField } from 'components/Field'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './CreateStudentModal.less'

const CreateStudentModal = props => {
  const displayName = props.class && props.class.displayName
  return (
    <Modal
      {...props}
      destroyOnClose
      onCancel={props.close(props.onCancel)}
      onOk={props.handleSubmit}
      confirmLoading={props.confirmLoading}
      title={'Add Student to ' + displayName}>
      <Form onSubmit={props.handleSubmit}>
        <Item label='Full Name'>
          <Row gutter={8}>
            <Col span={12}>
              <Field
                {...props}
                name='name.given'
                placeholder='First'
                component={TextField} />
            </Col>
            <Col span={12}>
              <Field
                {...props}
                name='name.family'
                placeholder='Last'
                component={TextField} />
            </Col>
          </Row>
        </Item>
        <Item label='Student ID'>
          <Field
            {...props}
            name='studentId'
            placeholder='abc123'
            component={TextField} />
        </Item>
        <Item label='Email (optional)'>
          <Field
            {...props}
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
