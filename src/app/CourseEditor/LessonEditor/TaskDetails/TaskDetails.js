import { Row, Col, Icon } from 'antd'
import { getTaskIcon } from 'utils/data'
import TaskDot from 'components/TaskDot'
import { getTaskTitle } from 'utils'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import TaskForm from '../TaskForm'
import React from 'react'
import './TaskDetails.less'

const TaskDetails = props => {
  const {
    confirmLoading,
    handleProps,
    setEditKey,
    removeTask,
    editTask,
    editKey,
    task,
    i,
    ...rest
  } = props

  const { id, type } = task

  return (
    <div className='task-details-inner'>
      {editKey !== id ? (
        <Row type='flex'>
          <Col className='flex-grow'>
            <h3 style={{ marginBottom: 0 }}>
              <Row align='middle' type='flex'>
                <TaskDot task={task} number={i + 1} />
                <Icon type={getTaskIcon(type)} />&ensp;
                <div className='ellipsis flex-grow'>{getTaskTitle(task)}</div>
              </Row>
            </h3>
          </Col>
          <Col className='actions'>
            <Row type='flex' align='middle' style={{ height: '100%' }}>
              <Icon type='edit' onClick={() => setEditKey(id)} />
              <Icon
                type='swap'
                style={{ transform: 'rotate(90deg)' }}
                {...handleProps} />
              <Icon type='delete' onClick={removeTask} />
            </Row>
          </Col>
        </Row>
      ) : (
        <TaskForm
          {...rest}
          task={task}
          initialValues={{
            displayName: task.displayName,
            type: task.type
          }}
          confirmLoading={confirmLoading}
          editTask={editTask}
          setEditKey={setEditKey} />
      )}
    </div>
  )
}

TaskDetails.propTypes = {}

export default enhancer(TaskDetails)
