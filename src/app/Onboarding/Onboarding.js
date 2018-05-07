import Field, { TextField, SelectField } from 'components/Field'
import { Modal, Form, Row, Col, Button } from 'antd'
import { Switch, Route } from 'react-router-dom'
import ClassModal from '../School/ClassModal'
import PropTypes from 'prop-types'
import React from 'react'
import enhancer, {
  profileDetailEnhancer,
  classOnboardingEnhancer
} from './enhancer'

import './Onboarding.less'

const Onboarding = props => {
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

const ProfileDetails = profileDetailEnhancer(props => {
  return (
    <Modal
      title='Complete Your Profile!'
      visible={true}
      onOk={props.handleSubmit}
      confirmLoading={props.confirmLoading}
      maskClosable={false}
      footer={
        <Button
          loading={props.confirmLoading}
          onClick={props.handleSubmit}
          type='primary'>
          Next
        </Button>
      }
      closable={false}>
      <form onSubmit={props.handleSubmit}>
        <Form.Item {...itemLayout} label='Full Name'>
          <Row gutter={8}>
            <Col span={12}>
              <Field
                {...props}
                name='name.given'
                component={TextField}
                placeholder='First' />
            </Col>
            <Col span={12}>
              <Field
                {...props}
                name='name.family'
                component={TextField}
                placeholder='Last' />
            </Col>
          </Row>
        </Form.Item>
        <Field
          {...props}
          label='Displayed Name'
          itemProps={itemLayout}
          name='displayName'
          component={TextField}
          placeholder='Ms. Lastname' />
        <Field
          {...props}
          label='School'
          itemProps={itemLayout}
          name='school'
          placeholder='Select a School'
          options={props.schools}
          component={SelectField} />
        <button type='submit' style={{ display: 'none' }} />
      </form>
    </Modal>
  )
})

Onboarding.propTypes = {
  handleSubmit: PropTypes.func,
  schools: PropTypes.array,
  uid: PropTypes.string
}

export default enhancer(Onboarding)
