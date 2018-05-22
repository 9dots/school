import Field, { TextField } from 'components/Field'
import { Button, Icon, Form, Row, Col } from 'antd'
import DrivePicker from 'components/DrivePicker'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

const LessonForm = props => {
  const {
    mode,
    onGoogleDoc,
    setEditKey,
    handleSubmit,
    confirmLoading,
    ...rest
  } = props

  const itemProps = { style: { marginBottom: 0 } }

  return (
    <Form
      style={{
        borderBottom: mode === 'updateLesson' ? '1px solid #e8e8e8' : ''
      }}>
      <Row type='flex' gutter={16}>
        <Col span={12}>
          <Field
            {...rest}
            itemProps={itemProps}
            label='Title'
            name='displayName'
            placeholder='Lesson Title...'
            component={TextField} />
        </Col>
        <Col span={6}>
          <Field
            {...rest}
            itemProps={itemProps}
            label='Slides'
            name='slides'
            addonAfter={
              <DrivePicker
                onSelect={onGoogleDoc('slides')}
                component={<Icon style={{ cursor: 'pointer' }} type='google' />} />
            }
            placeholder='Link to Slides...'
            component={TextField} />
        </Col>
        <Col span={6}>
          <Field
            {...rest}
            itemProps={itemProps}
            label='Lesson Plan'
            name='lessonPlan'
            addonAfter={
              <DrivePicker
                onSelect={onGoogleDoc('lessonPlan')}
                component={<Icon style={{ cursor: 'pointer' }} type='google' />} />
            }
            placeholder='Link to Lesson Plan...'
            component={TextField} />
        </Col>
      </Row>

      <Field
        {...rest}
        itemProps={itemProps}
        label='Description'
        name='description'
        placeholder='Description...'
        component={TextField} />

      <Form.Item style={{ textAlign: 'right', marginTop: 10 }}>
        <Button
          style={{ marginRight: 10 }}
          disabled={confirmLoading}
          onClick={() => setEditKey(null)}>
          Cancel
        </Button>
        <Button type='primary' loading={confirmLoading} onClick={handleSubmit}>
          {mode === 'addLesson' ? 'Create' : 'Save'}
        </Button>
      </Form.Item>
    </Form>
  )
}

LessonForm.propTypes = {
  mode: PropTypes.string.isRequired
}

export default enhancer(LessonForm)
