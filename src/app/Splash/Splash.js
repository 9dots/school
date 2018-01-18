import { firebaseConnect } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import { Row, Col, Button, Icon } from 'antd'
import React from 'react'
import './Splash.less'

const enhancer = compose(
  firebaseConnect(),
  withHandlers({
    login: props => event => props.firebase.login({ provider: 'google' })
  })
)

const Splash = enhancer(props => {
  return (
    <Row className='splash' align='middle' justify='center' type='flex'>
      <Col>
        <h1>
          <Icon type='rocket' />
          DOCKET
        </h1>
        <Button onClick={props.login} ghost size='large'>
          <Icon type='login' />
          SIGN IN
        </Button>
      </Col>
    </Row>
  )
})

export default Splash
