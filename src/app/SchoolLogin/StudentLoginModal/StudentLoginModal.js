import Field, { TextField } from 'components/Field'
import { Modal, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './StudentLoginModal.less'

const StudentLoginModal = props => {
  const {
    passwordType = 'image',
    confirmLoading,
    handleSubmit,
    onCancel,
    avatars,
    student,
    submit,
    ...rest
  } = props
  const picturePwd = passwordType === 'image'

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
          {avatars.map(avatar => (
            <Col key={avatar.id} span={3} className='login-image'>
              <img
                onClick={() => submit({ password: avatar.value })}
                src={avatar.src} />
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
