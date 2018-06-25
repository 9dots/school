import { firebaseConnect } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import { Modal, Button, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { login } from 'ducks/login'
import PropTypes from 'prop-types'
import React from 'react'

import './LoginModal.less'

const enhancer = compose(
  connect(
    null,
    { login }
  ),
  firebaseConnect(),
  withHandlers({
    login: props => e => {
      props.onCancel(null)
      props.login()
    }
  })
)

const LoginModal = props => {
  return (
    <Modal
      title='SIGN IN'
      className='login-modal'
      footer={''}
      {...props}
      visible>
      <h3>You need to sign in first.</h3>
      <Row type='flex' gutter={16} justify='center'>
        <Col>
          <Button icon='close' onClick={props.onCancel}>
            Cancel
          </Button>
        </Col>
        <Col>
          <Button
            icon='login'
            className='secondary'
            type='primary'
            onClick={props.login}>
            Sign In
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

LoginModal.propTypes = {}

export default enhancer(LoginModal)
