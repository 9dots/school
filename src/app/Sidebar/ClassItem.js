import { Button, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { stopEvent } from '../../utils'

import React from 'react'

const ClassItem = ({ cls, showModal, school, isTeacher }) => {
  return (
    <Link to={`/class/${cls.id}`}>
      <Row type='flex' justify='space-between' align='middle'>
        <Col>{cls.displayName}</Col>
        <Col className='class-actions'>
          {isTeacher && (
            <Button
              // type='primary'
              ghost
              onClick={stopEvent(showModal('createStudent'))}
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
