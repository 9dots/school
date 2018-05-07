import { Modal, Input, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

import avatars from 'assets/avatars'
import './StudentLoginModal.less'

const StudentLoginModal = ({ student, passwordType = 'picture', ...rest }) => {
  const picturePwd = passwordType === 'picture'

  return (
    <Modal
      width={picturePwd ? 900 : 520}
      {...rest}
      visible
      title={student.displayName}>
      {picturePwd ? (
        <Row>
          {Object.keys(avatars)
            .sort(() => Math.random() - 0.5)
            .map(key => (
              <Col key={key} span={3} style={{ padding: 10 }}>
                <img src={avatars[key]} style={{ width: '100%' }} />
              </Col>
            ))}
        </Row>
      ) : (
        <div style={{ padding: '25px 100px' }}>
          <Input size='large' placeholder='Enter Your Password...' />
        </div>
      )}
    </Modal>
  )
}

StudentLoginModal.propTypes = {}

export default StudentLoginModal
