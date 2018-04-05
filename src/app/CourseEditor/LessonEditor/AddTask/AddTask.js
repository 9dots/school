import Field from '../../../../components/Field'
import { TextField } from 'redux-form-antd'
import { Form, Button, Icon } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './AddTask.less'

const AddTask = props => {
  const { editing } = props
  return editing ? <AddTaskForm {...props} /> : <AddTaskButton {...props} />
}

const AddTaskForm = enhancer(
  ({ confirmLoading, setEditKey, handleSubmit, onSubmit }) => {
    return (
      <div className='add-section'>
        <Form>
          <Form.Item>
            <Field
              placeholder='Link to resource...'
              name='url'
              component={TextField} />
          </Form.Item>
          <Form.Item>
            <Button
              loading={confirmLoading}
              type='primary'
              onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
            <Button disabled={confirmLoading} onClick={() => setEditKey(null)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
)

const AddTaskButton = ({ editing, lesson, setEditKey }) => (
  <div
    onClick={() => setEditKey(lesson + 'addTask')}
    className='add-section'
    style={{ borderTopColor: 'transparent' }}>
    <Icon type='plus-circle' style={{ marginRight: 10 }} />Add a Task
  </div>
)

AddTask.propTypes = {}

export default AddTask
