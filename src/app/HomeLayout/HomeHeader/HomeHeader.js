import { firebaseConnect } from 'react-redux-firebase'
import { Layout, Button, Icon, Row, Col } from 'antd'
import { compose, withHandlers } from 'recompose'
import PropTypes from 'prop-types'
import React from 'react'
import './HomeHeader.less'

const enhancer = compose(
  firebaseConnect(),
  withHandlers({
    login: props => event => props.firebase.login({ provider: 'google' })
  })
)

const HomeHeader = ({ login, allowSignIn }) => {
  return (
    <Layout.Header className='dark'>
      <Row type='flex'>
        <Col className='flex-grow'>
          <h1 style={{ color: 'white', letterSpacing: '3px' }}>
            my<b>9DOTS</b>
          </h1>
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
