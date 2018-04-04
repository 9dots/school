import PropTypes from 'prop-types'
import React from 'react'
import { Button, Row, Col, Icon } from 'antd'
import './TaskDetails.less'

const TaskDetails = ({ task, editKey, setEditKey }) => {
  const { displayName, id } = task

  return (
    <div className='task-details-inner'>
      {editKey !== id ? (
        <Row type='flex'>
          <Col className='flex-grow ellipsis'>
            <h3 style={{ marginBottom: 0 }}>
              <Icon type='link' />&ensp;
              {displayName}
            </h3>
          </Col>
          <Col className='actions'>
            <Icon type='edit' onClick={() => setEditKey(id)} />
            <Icon type='swap' style={{ transform: 'rotate(90deg)' }} />
            <Icon shape='circle' type='delete' onClick={() => setEditKey(id)} />
          </Col>
        </Row>
      ) : (
        <i>
          Form Goes Here
          <Button type='primary' onClick={() => setEditKey(null)}>
            Save
          </Button>
        </i>
      )}
    </div>
  )
}

TaskDetails.propTypes = {}

export default TaskDetails
