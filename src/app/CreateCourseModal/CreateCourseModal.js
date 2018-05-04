import Field, { TextField, SelectField, TextAreaField } from 'components/Field'
import { gradesToText, tags, timeUnits } from 'utils/data'
import { Modal, Form, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './CreateCourseModal.less'

const CreateCourseModal = props => {
  const { close, onCancel, onSubmit, handleSubmit, ...rest } = props

  const maxLength = '150'

  return (
    <Modal
      className='create-course-modal'
      {...rest}
      onCancel={close(onCancel)}
      onOk={handleSubmit}
      title='Create a New Course'>
      <Form>
        <Form.Item label='Title'>
          <Field
            {...props}
            name='displayName'
            placeholder='Enter your title here...'
            component={TextField} />
        </Form.Item>
        <Form.Item label='Description'>
          <Field
            {...props}
            id='course-description'
            name='description'
            rows={3}
            maxLength={maxLength}
            autosize={{ minRows: 3 }}
            placeholder='A little bit about this course...'
            component={TextAreaField} />
        </Form.Item>

        <Form.Item label='Tags'>
          <Field
            {...props}
            name='tags'
            mode='multiple'
            style={{ width: 'auto' }}
            multiple
            placeholder='Javascript'
            filterOption={(inputVal, { props: { label = '' } }) =>
              label.toLowerCase().indexOf(inputVal.toLowerCase()) > -1
            }
            options={tags.map(tag => ({ ...tag, value: tag.id }))}
            component={SelectField} />
        </Form.Item>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label='Grade Level'>
              <Field
                {...props}
                name='grade'
                placeholder='Select a Grade'
                options={gradeChunks.map(chunk => ({
                  value: chunk.join(','),
                  label: gradesToText(chunk)
                }))}
                component={SelectField} />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label='Duration'>
              <Row gutter={8}>
                <Col span={8}>
                  <TextField
                    {...props}
                    name='duration.time'
                    type='number'
                    placeholder='8' />
                </Col>
                <Col span={16}>
                  <SelectField
                    {...props}
                    fluid
                    name='duration.unit'
                    placeholder='Weeks'
                    options={timeUnits.map(unit => ({
                      label: unit,
                      value: unit
                    }))} />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

CreateCourseModal.propTypes = {}

export default enhancer(CreateCourseModal)

const gradeChunks = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10, 11, 12],
  [13],
  [14]
]
