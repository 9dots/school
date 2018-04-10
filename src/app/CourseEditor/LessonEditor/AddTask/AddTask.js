import Field from '../../../../components/Field'
import { TextField } from 'redux-form-antd'
import { Form, Button, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './AddTask.less'

const AddTask = enhancer(
  ({ confirmLoading, setEditKey, handleSubmit, onSubmit }) => {
    return (
      <Form
        style={{
          borderTop: '1px solid #e3e3e3',
          paddingTop: 15
        }}>
        <Row type='flex' gutter={16}>
          <Col className='flex-grow'>
            <Form.Item>
              <Field
                placeholder='Link to resource...'
                name='url'
                component={TextField} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button
                style={{ marginRight: 10 }}
                disabled={confirmLoading}
                onClick={() => setEditKey(null)}>
                Cancel
              </Button>
              <Button
                loading={confirmLoading}
                type='primary'
                onClick={handleSubmit(onSubmit)}>
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
)

AddTask.propTypes = {}

export default AddTask
