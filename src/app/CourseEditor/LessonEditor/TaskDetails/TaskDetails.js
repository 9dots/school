import { Button, Row, Col, Icon, Form } from 'antd'
import Field from '../../../../components/Field'
import { TextField } from 'redux-form-antd'
import { reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import { typeToIcon } from 'utils'
import enhancer from './enhancer'
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
    task
  } = props
  const { displayName, id, type } = task

  return (
    <div className='task-details-inner'>
      {editKey !== id ? (
        <Row type='flex'>
          <Col className='flex-grow ellipsis'>
            <h3 style={{ marginBottom: 0 }}>
              <Icon type={typeToIcon(type)} />&ensp;
              {displayName}
            </h3>
          </Col>
          <Col className='actions'>
            <Icon type='edit' onClick={() => setEditKey(id)} />
            <Icon
              type='swap'
              style={{ transform: 'rotate(90deg)' }}
              {...handleProps} />
            <Icon type='delete' onClick={removeTask} />
          </Col>
        </Row>
      ) : (
        <TaskForm
          initialValues={{ displayName: task.displayName }}
          confirmLoading={confirmLoading}
          editTask={editTask}
          setEditKey={setEditKey} />
      )}
    </div>
  )
}

const TaskForm = reduxForm({ form: 'taskEditForm' })(
  ({ setEditKey, handleSubmit, editTask, confirmLoading }) => (
    <Form style={{ margin: '8px 0 10px' }}>
      <Row type='flex' gutter={16} style={{ margin: 0 }}>
        <Col className='flex-grow'>
          <Form.Item style={{ marginBottom: 0 }}>
            <Field required name='displayName' component={TextField} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              style={{ marginRight: 10 }}
              disabled={confirmLoading}
              onClick={() => setEditKey(null)}>
              Cancel
            </Button>
            <Button
              loading={confirmLoading}
              type='primary'
              onClick={handleSubmit(editTask)}>
              Save
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
)

TaskDetails.propTypes = {}

export default enhancer(TaskDetails)
