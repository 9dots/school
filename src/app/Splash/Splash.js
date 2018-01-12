import { firebaseConnect } from 'react-redux-firebase'
import { compose, withHandlers } from 'recompose'
import { Row, Col, Button } from 'antd'
import React from 'react'
import './Splash.less'

const enhancer = compose(
  firebaseConnect(),
  withHandlers({
    login: props => event =>
      props.firebase
        .login({ provider: 'google' })
        .then(res => console.log('signed in', res))
  })
)

const Splash = enhancer(props => {
  return (
    <Row className='splash' align='middle' justify='center' type='flex'>
      <Col>
        <Button onClick={props.login}>Sign In</Button>
      </Col>
    </Row>
  )
})

export default Splash
