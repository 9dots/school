import { firebaseConnect } from 'react-redux-firebase'
import { Layout, Button, Icon, Row, Col } from 'antd'
import { compose, withHandlers } from 'recompose'
import { config } from 'configureStore'
import { connect } from 'react-redux'
import { login } from 'ducks/login'
import PropTypes from 'prop-types'
import React from 'react'
import './HomeHeader.less'

const enhancer = compose(
  connect(
    null,
    { login }
  ),
  firebaseConnect(),
  withHandlers({
    login: props => event => props.login()
    // props.firebase.login({ provider: 'google', scopes: config.scopes })
  })
)

const HomeHeader = ({ login, allowSignIn }) => {
  return (
    <Layout.Header className='dark'>
      <Row type='flex'>
        <Col className='flex-grow'>
          <h1 style={{ color: 'white', letterSpacing: '3px' }}>
            <b>9 DOTS</b>
          </h1>
        </Col>
        <Col>
          <a
            target='_blank'
            href='/privacy'
            style={{ color: 'white', marginRight: 30, fontSize: 13 }}>
            Privacy Policy
          </a>
        </Col>
        <Col>
          {!!allowSignIn && (
            <Button onClick={login} type='primary' className='secondary'>
              <Icon type='login' />
              SIGN IN
            </Button>
          )}
        </Col>
      </Row>
    </Layout.Header>
  )
}

HomeHeader.propTypes = {}

export default enhancer(HomeHeader)
