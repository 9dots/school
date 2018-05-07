import Field, { TextField, SelectField } from 'components/Field'
import { grades } from 'utils/data'
import { Modal, Form } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import { stopEvent } from 'utils'
import React from 'react'

import './ClassModal.less'

const itemProps = { labelCol: { span: 5 }, wrapperCol: { span: 19 } }

const ClassModal = props => (
  <span onClick={stopEvent(() => {})}>
    <Modal
      {...props}
      onCancel={props.close(props.onCancel)}
      onOk={props.handleSubmit}
      title='Create A Class'>
      <form>
        <Field
          {...props}
          itemProps={itemProps}
          label='Class name'
          name='displayName'
          placeholder='Coding 1'
          component={TextField} />
        <Field
          {...props}
          options={grades}
          itemProps={itemProps}
          label='Grade'
          name='grade'
          placeholder='Select a Grade'
          component={SelectField} />
      </form>
    </Modal>
  </span>
)

ClassModal.propTypes = {
  school: PropTypes.string.isRequired
}

export default enhancer(ClassModal)
