import ClassModal from '../School/ClassModal'
import { Icon, Row, Col } from 'antd'
import { stopEvent } from '../../utils'
import React from 'react'

const MenuTitle = ({
  hideModal,
  isVisible,
  showModal,
  onCreateModal,
  isTeacher,
  school
}) => {
  const { id, displayName } = school
  return (
    <div>
      <Row type='flex' justify='space-between' align='middle'>
        <Col className='ellipsis' style={{ flex: 1, paddingRight: 10 }}>
          {displayName}
        </Col>
        {isTeacher && (
          <Col>
            <Icon
              className='add-class-button'
              type='plus'
              size='small'
              onClick={stopEvent(
                showModal({
                  name: 'classModal',
                  onOk: msg => onCreateModal(msg, 'classModal'),
                  school: id
                })
              )} />
          </Col>
        )}
      </Row>
      {/* {isVisible('classModal-' + id) && (
        <ClassModal
          visible
          school={id}
          onOk={}
          onCancel={hideModal('classModal-' + id)} />
      )} */}
    </div>
  )
}

export default MenuTitle
