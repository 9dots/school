import { TextField, SelectField } from 'redux-form-antd'
import { Modal, Form, Row, Col } from 'antd'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './Onboarding.less'

const commonProps = {
  validate: v => (v ? '' : 'Required')
}

const Onboarding = props => {
  return (
    <div>
      <Modal
        title={'Complete Your Profile!'}
        visible={true}
        maskClosable={false}
        closable={false}>
        <form onSubmit={props.handleSubmit(props.onSubmit)}>
          <Row gutter={8}>
            <Col span={12}>
              <Item {...itemLayout} name='given' label='First Name'>
                <Field
                  {...commonProps}
                  name='name.given'
                  component={TextField}
                  placeholder='Maybel' />
              </Item>
            </Col>
            <Col span={12}>
              <Item {...itemLayout} name='family' label='Last Name'>
                <Field
                  {...commonProps}
                  name='name.family'
                  component={TextField}
                  placeholder='Royster' />
              </Item>
            </Col>
          </Row>
          <Item label='Displayed Name'>
            <Field
              {...commonProps}
              validateStatus='validating'
              name='displayName'
              component={TextField}
              placeholder='Ms. Royster' />
          </Item>
          <Item label='School'>
            <Field
              {...commonProps}
              name='school'
              options={props.schools}
              component={SelectField}
              placeholder='abc123' />
          </Item>
          <input type='submit' />
        </form>
      </Modal>
    </div>
  )
}

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

const Item = props => <Form.Item {...itemLayout} {...props} />

Onboarding.propTypes = {
  handleSubmit: PropTypes.func,
  schools: PropTypes.array,
  uid: PropTypes.string
}

export default enhancer(Onboarding)
