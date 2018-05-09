import Field, { TextField, SelectField } from 'components/Field'
import { grades } from 'utils/data'
import { Modal, Form } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './CreateClassModal.less'

const itemProps = { labelCol: { span: 5 }, wrapperCol: { span: 19 } }

const CreateClassModal = ({ stepModal, ...props }) => (
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
    {stepModal && (
      <div style={{ textAlign: 'center', fontSize: 12, fontStyle: 'italic' }}>
        <a onClick={stepModal.next}>
          I don&apos;t want to create a new class. Find a class to join.
        </a>
      </div>
    )}
  </Modal>
)

CreateClassModal.propTypes = {}

export default enhancer(CreateClassModal)
