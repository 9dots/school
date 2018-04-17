import { Button, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { stopEvent } from '../../utils'

import React from 'react'

const ClassItem = ({ cls, modal, school, isTeacher }) => {
  return (
    <Link to={`/class/${cls.id}`}>
      <Row type='flex' justify='space-between' align='middle'>
        <Col className='ellipsis flex-grow'>{cls.displayName}</Col>
        <Col className='class-actions' style={{ paddingLeft: 10 }}>
          {isTeacher && (
            <Button
              ghost
              onClick={stopEvent(
                modal.showModal({
                  name: 'createStudent',
                  class: cls,
                  school: school,
                  onOk: modal.hideModal('createStudent'),
                  onCancel: modal.hideModal('createStudent')
                })
              )}
              icon='user-add'
              shape='circle'
              size='small' />
          )}
        </Col>
      </Row>
    </Link>
  )
}

export default ClassItem
