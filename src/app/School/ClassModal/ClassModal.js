import Field, { TextField, SelectField } from 'components/Field'
import { grades } from 'utils/data'
import { Modal, Form } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import { stopEvent } from 'utils'
import React from 'react'

import './ClassModal.less'

const ClassModal = props => (
  <span onClick={stopEvent(() => {})}>
    <Modal
      {...props}
      onCancel={props.close(props.onCancel)}
      onOk={props.handleSubmit}
      title='Create A Class'>
      <Form>
        <Form.Item label='Name'>
          <Field
            {...props}
            label='Name'
            name='displayName'
            placeholder='Coding 1'
            component={TextField} />
        </Form.Item>
        <Form.Item label='Grade'>
          <Field
            {...props}
            options={grades}
            name='grade'
            placeholder='Select a Grade'
            component={SelectField} />
        </Form.Item>
      </Form>
    </Modal>
  </span>
)

ClassModal.propTypes = {
  school: PropTypes.string.isRequired
}

export default enhancer(ClassModal)
