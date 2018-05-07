import { Modal, Input, Row, Col } from 'antd'
import Field, { TextField } from 'components/Field'
import avatars from 'assets/avatars'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './StudentLoginModal.less'

const StudentLoginModal = props => {
  const {
    passwordType = 'picture',
    confirmLoading,
    handleSubmit,
    onCancel,
    student,
    ...rest
  } = props
  const picturePwd = passwordType === 'picture'

  return (
    <Modal
      onOk={handleSubmit}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      width={picturePwd ? 900 : 520}
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
          <Field
            {...rest}
            name='password'
            type='password'
            size='large'
            component={TextField}
            placeholder='Enter Your Password...' />
        </div>
      )}
    </Modal>
  )
}

StudentLoginModal.propTypes = {}

export default enhancer(StudentLoginModal)
