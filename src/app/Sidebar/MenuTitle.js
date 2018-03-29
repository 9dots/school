import ClassModal from '../School/ClassModal'
import { Icon, Row, Col } from 'antd'
import { stopEvent } from '../../utils'
import React from 'react'

const MenuTitle = ({
  hideModal,
  isVisible,
  showModal,
  onCreateModal,
  school
}) => {
  const { id, displayName } = school
  return (
    <div>
      <Row type='flex' justify='space-between' align='middle'>
        <Col>{displayName}</Col>
        <Col>
          <Icon
            className='add-class-button'
            type='plus'
            size='small'
            onClick={stopEvent(showModal('classModal-' + id))} />
        </Col>
      </Row>
      {isVisible('classModal-' + id) && (
        <ClassModal
          visible
          school={id}
          onOk={msg => onCreateModal(msg, 'classModal-' + id)}
          onCancel={hideModal('classModal-' + id)} />
      )}
    </div>
  )
}

export default MenuTitle
