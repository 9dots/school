import { Card, Form, Input, Divider, Button } from 'antd'
import Field, { TextField, SelectField } from 'components/Field'
import { grades } from 'utils/data'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './ClassDetails.less'

const itemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 }
  }
}

const ClassDetails = props => {
  const { handleSubmit, classData, teachers, school, isLoaded, ...rest } = props

  if (!isLoaded) return <span />

  return (
    <Card className='course'>
      <h2>Class Details</h2>
      <Divider />
      <div style={{ maxWidth: 600 }}>
        <Form>
          <Field
            {...rest}
            itemProps={itemLayout}
            label='Class Title'
            name='displayName'
            component={TextField} />
          <Field
            {...rest}
            label='Grade'
            itemProps={itemLayout}
            name='grade'
            options={grades}
            component={SelectField} />
          <Form.Item label='School' {...itemLayout}>
            <Input disabled defaultValue={school.displayName} />
          </Form.Item>
          <Form.Item label='Teachers' {...itemLayout}>
            {teachers.map((teacher, id) => (
              <Input disabled key={id} defaultValue={teacher.displayName} />
            ))}
          </Form.Item>
          <Button
            loading={props.confirmLoading}
            disabled={!props.dirty}
            onClick={handleSubmit}
            type='primary'
            style={{ float: 'right' }}>
            Save Changes
          </Button>
        </Form>
      </div>
    </Card>
  )
}

ClassDetails.propTypes = {}

export default enhancer(ClassDetails)
