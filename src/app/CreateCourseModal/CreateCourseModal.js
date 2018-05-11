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
  const itemProps = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
  }

  return (
    <Modal
      className='create-course-modal'
      {...rest}
      onCancel={close(onCancel)}
      onOk={handleSubmit}
      title='Create a New Course'>
      <Form>
        <Field
          {...props}
          itemProps={itemProps}
          label='Title'
          name='displayName'
          placeholder='Enter your title here...'
          component={TextField} />
        <Field
          {...props}
          itemProps={itemProps}
          label='Description'
          id='course-description'
          name='description'
          rows={3}
          maxLength={maxLength}
          autosize={{ minRows: 3 }}
          placeholder='A little bit about this course...'
          component={TextAreaField} />

        <Field
          {...props}
          itemProps={itemProps}
          label='Tags'
          name='tags'
          mode='multiple'
          style={{ width: 'auto' }}
          multiple
          placeholder='Javascript'
          optionFilterProp='label'
          options={tags.map(tag => ({ ...tag, value: tag.id }))}
          component={SelectField} />
        <Field
          {...props}
          itemProps={itemProps}
          label='Grade Level'
          name='grade'
          placeholder='Select a Grade'
          options={gradeChunks.map(chunk => ({
            value: chunk.join(','),
            label: gradesToText(chunk)
          }))}
          component={SelectField} />

        <Form.Item label='Duration' {...itemProps}>
          <Row gutter={8}>
            <Col span={8}>
              <Field
                {...props}
                name='duration.time'
                type='number'
                component={TextField}
                placeholder='8' />
            </Col>
            <Col span={16}>
              <Field
                {...props}
                fluid
                component={SelectField}
                name='duration.unit'
                placeholder='Weeks'
                options={timeUnits.map(unit => ({
                  label: unit,
                  value: unit
                }))} />
            </Col>
          </Row>
        </Form.Item>
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
