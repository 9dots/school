import { Modal, Form, Row, Col } from 'antd'
import Field, { TextField } from 'components/Field'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './CreateStudentModal.less'

const itemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
}

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
        <Form.Item {...itemLayout} label='Full Name'>
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
        </Form.Item>
        <Field
          {...props}
          itemProps={itemLayout}
          label='Student ID'
          name='studentId'
          placeholder='abc123'
          component={TextField} />
        <Field
          {...props}
          itemProps={itemLayout}
          label='Email (optional)'
          name='email'
          placeholder='student@email.com'
          component={TextField} />
      </Form>
    </Modal>
  )
}
CreateStudentModal.propTypes = {}

export default enhancer(CreateStudentModal)
