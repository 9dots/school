import { Modal, Form, Row, Col, AutoComplete } from 'antd'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { compose, withHandlers } from 'recompose'
import { TextField } from 'redux-form-antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { rpc } from '../actions'
import React from 'react'

import './Onboarding.less'

const commonProps = {
  name: 'kek2',
  warn: v => (v && v.length > 2 ? '' : 'too short'),
  validate: v => (v ? '' : 'Required')
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const enhancer = compose(
  reduxForm({
    form: 'onboarding'
  }),
  connect(
    ({ firebase: { auth: { uid } } }) => ({
      uid
    }),
    { rpc }
  ),
  withHandlers({
    onSubmit: ({ teacherSignUp, form, uid, dispatch }) => values => {
      return dispatch(
        rpc('user.teacherSignUp', {
          teacher: uid,
          school: 'abc123',
          ...values
        })
      )
        .then(res => {
          if (!res.ok) {
            throw new Error(res.error)
          }
        })
        .catch(e => {
          throw new SubmissionError({
            school: 'School code not found.'
          })
        })
    }
  })
)

const Onboarding = enhancer(props => {
  console.log(props.submitting, props)
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
              component={TextField}
              placeholder='abc123' />
          </Item>
          <input type='submit' />
        </form>
      </Modal>
    </div>
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

Onboarding.propTypes = {}

export default Onboarding
