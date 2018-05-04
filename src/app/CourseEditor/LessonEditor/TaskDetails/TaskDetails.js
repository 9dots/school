import Field, { TextField, SelectField } from 'components/Field'
import { Button, Row, Col, Icon, Form } from 'antd'
import { taskTypes, getTaskIcon } from 'utils/data'
import { getFormDefaults } from 'utils'
import { withFormik } from 'formik'
import schema from 'school-schema'
import PropTypes from 'prop-types'
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
    task,
    ...rest
  } = props

  const { displayName, id, type } = task

  return (
    <div className='task-details-inner'>
      {editKey !== id ? (
        <Row type='flex'>
          <Col className='flex-grow ellipsis'>
            <h3 style={{ marginBottom: 0 }}>
              <Icon type={getTaskIcon(type)} />&ensp;
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
          {...rest}
          task={task}
          initialValues={{ displayName: task.displayName, type: task.type }}
          confirmLoading={confirmLoading}
          editTask={editTask}
          setEditKey={setEditKey} />
      )}
    </div>
  )
}

const TaskForm = withFormik({
  displayName: 'taskEditForm',
  mapPropsToValues: ({ initialValues = {} }) => ({
    type: undefined,
    displayName: undefined,
    ...initialValues
  }),
  handleSubmit: (values, { props }) => {
    props.editTask(values)
  },
  ...getFormDefaults(schema.course.updateTask, cast)
})(({ setEditKey, handleSubmit, editTask, confirmLoading, ...props }) => (
  <Form onSubmit={handleSubmit} style={{ margin: '8px 0 10px' }}>
    <Row type='flex' gutter={16} style={{ margin: 0 }}>
      <Col>
        <Form.Item style={{ marginBottom: 0 }}>
          <Field
            {...props}
            name='type'
            className='type-selector'
            component={SelectField}
            options={taskTypes.map(task => ({
              ...task,
              label: (
                <span>
                  <Icon type={task.icon} style={{ marginRight: 10 }} />
                  {task.label}
                </span>
              )
            }))} />
        </Form.Item>
      </Col>
      <Col className='flex-grow'>
        <Form.Item style={{ marginBottom: 0 }}>
          <Field {...props} name='displayName' component={TextField} />
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
            onClick={handleSubmit}>
            Save
          </Button>
        </Form.Item>
      </Col>
    </Row>
  </Form>
))

function cast (values, props) {
  return {
    ...values,
    task: props.task.id,
    course: props.course,
    draft: props.draft,
    lesson: props.lesson
  }
}

TaskDetails.propTypes = {}

export default enhancer(TaskDetails)
