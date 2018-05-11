import { Modal, Button } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

import './LoginModal.less'

const LoginModal = props => {
  return (
    <Modal title='Login' visible>
      You need to login
      <Button>Login</Button>
    </Modal>
  )
}

LoginModal.propTypes = {}

export default LoginModal
