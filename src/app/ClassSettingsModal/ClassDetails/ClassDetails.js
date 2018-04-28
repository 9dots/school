import PropTypes from 'prop-types'
import { Card, Form, Input, Divider, Button } from 'antd'
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

const ClassDetails = ({ classData }) => {
  const { displayName, grade, school, teachers } = classData
  console.log(classData)
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
            <Input defaultValue={grade} />
          </Form.Item>
          <Form.Item label='School' {...itemLayout}>
            <Input defaultValue={school} />
          </Form.Item>
          <Form.Item label='Teacher' {...itemLayout}>
            <Input defaultValue={Object.keys(teachers)[0]} />
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

export default ClassDetails
