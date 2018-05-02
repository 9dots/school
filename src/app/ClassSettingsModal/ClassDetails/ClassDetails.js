import { Card, Form, Input, Divider, Button, Select } from 'antd'
import { grades, gradesToText } from 'utils/data'
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

const ClassDetails = ({ classData, teachers, school, isLoaded }) => {
  const { displayName, grade } = classData

  if (!isLoaded) return <span />

  return (
    <Card className='course'>
      <h2>Class Details</h2>
      <Divider />
      <div style={{ maxWidth: 600 }}>
        <Form>
          <Form.Item label='Class Title' {...itemLayout}>
            <Input defaultValue={displayName} />
          </Form.Item>
          <Form.Item label='Grade' {...itemLayout}>
            <Select defaultValue={gradesToText(grade)}>
              {grades.map(g => (
                <Select.Option key={g.id} value={g.value}>
                  {g.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='School' {...itemLayout}>
            <Input disabled defaultValue={school.displayName} />
          </Form.Item>
          <Form.Item label='Teacher' {...itemLayout}>
            <Input disabled defaultValue={teachers[0].displayName} />
          </Form.Item>
          <Button type='primary' style={{ float: 'right' }}>
            Save Changes
          </Button>
        </Form>
      </div>
    </Card>
  )
}

ClassDetails.propTypes = {}

export default enhancer(ClassDetails)
