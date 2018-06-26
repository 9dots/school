import Field, { TextField, SelectField } from 'components/Field'
import { Button, Row, Col, Icon, Form } from 'antd'
import { taskTypes } from 'utils/data'
import enhancer from './enhancer'
import PropTypes from 'prop-types'
import React from 'react'
import './TaskForm.less'

const itemProps = { style: { marginBottom: 0 } }

const TaskForm = ({
  setEditKey,
  handleSubmit,
  editTask,
  confirmLoading,
  ...props
}) => (
  <Form onSubmit={handleSubmit} style={{ margin: '8px 0 10px' }}>
    <Row type='flex' gutter={16} style={{ margin: '0 -8px' }}>
      <Col>
        <Field
          {...props}
          itemProps={itemProps}
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
      </Col>
      <Col className='flex-grow'>
        <Field
          {...props}
          itemProps={itemProps}
          name='displayName'
          addonBefore='Task Title:'
          placeholder='Enter a title…'
          component={TextField} />
      </Col>
      <Col>
        <Form.Item {...itemProps}>
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
)

TaskForm.propTypes = {}

export default enhancer(TaskForm)
