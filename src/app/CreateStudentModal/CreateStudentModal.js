import { Modal, Form, Row, Col, Icon } from 'antd'
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

const CreateStudentModal = ({
  mask = true,
  stepModal,
  edit,
  user = {},
  ...props
}) => {
  const displayName = props.class && props.class.displayName

  return (
    <Modal
      {...props}
      mask={mask}
      visible
      destroyOnClose
      onCancel={props.close(props.onCancel)}
      onOk={props.handleSubmit}
      confirmLoading={props.confirmLoading}
      title={edit ? 'Edit User' : 'Add Student to ' + displayName}>
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
        {edit && (
          <Field
            {...props}
            itemProps={itemLayout}
            label='Username'
            name='username'
            placeholder='Username'
            component={TextField} />
        )}
        {!edit && (
          <Field
            {...props}
            itemProps={itemLayout}
            label='Email (optional)'
            name='email'
            placeholder='student@email.com'
            component={TextField} />
        )}
      </Form>
      {stepModal && (
        <div style={{ textAlign: 'center', fontSize: 12 }}>
          <a onClick={stepModal.next}>
            <Icon type='plus' />&ensp;Find an Existing Student
          </a>
        </div>
      )}
    </Modal>
  )
}
CreateStudentModal.propTypes = {}

export default enhancer(CreateStudentModal)
