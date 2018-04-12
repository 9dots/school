import enhancer, {
  profileDetailEnhancer,
  classOnboardingEnhancer
} from './enhancer'
import { TextField, SelectField } from 'redux-form-antd'
import { Modal, Form, Row, Col, Button } from 'antd'
import { Switch, Route } from 'react-router-dom'
import ClassModal from '../School/ClassModal'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import React from 'react'

import './Onboarding.less'

const commonProps = {
  validate: v => (v ? '' : 'Required')
}

const Onboarding = props => {
  // if (!props.isLoaded) return <Loading />
  return (
    <Switch>
      <Route
        path='/onboarding'
        exact
        render={routeProps => <ProfileDetails {...props} />} />
      <Route
        path='/onboarding/class'
        exact
        render={routeProps => <ClassOnboarding {...props} />} />
    </Switch>
  )
}

const ClassOnboarding = classOnboardingEnhancer(props => {
  return (
    <ClassModal onOk={props.close} onCancel={props.close} visible {...props} />
  )
})

const ProfileDetails = profileDetailEnhancer(props => {
  return (
    <Modal
      title='Complete Your Profile!'
      visible={true}
      onOk={props.handleSubmit(props.onSubmit)}
      confirmLoading={props.confirmLoading}
      maskClosable={false}
      footer={
        <Button
          loading={props.confirmLoading}
          onClick={props.handleSubmit(props.onSubmit)}
          type='primary'>
          Next
        </Button>
      }
      closable={false}>
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <Item label='Full Name'>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item name='given'>
                <Field
                  {...commonProps}
                  name='name.given'
                  component={TextField}
                  placeholder='First' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='family' style={{ marginBottom: 0 }}>
                <Field
                  {...commonProps}
                  name='name.family'
                  component={TextField}
                  placeholder='Last' />
              </Form.Item>
            </Col>
          </Row>
        </Item>
        <Item label='Displayed Name'>
          <Field
            {...commonProps}
            validateStatus='validating'
            name='displayName'
            component={TextField}
            placeholder='Ms. Lastname' />
        </Item>
        <Item label='School'>
          <Field
            {...commonProps}
            name='school'
            placeholder='Select a School'
            options={props.schools}
            component={SelectField} />
        </Item>
        <button type='submit' style={{ display: 'none' }} />
      </form>
    </Modal>
  )
})

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
