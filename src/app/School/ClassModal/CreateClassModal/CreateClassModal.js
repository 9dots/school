import Field, { TextField, SelectField } from 'components/Field'
import { grades } from 'utils/data'
import { Modal, Form, Icon } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './CreateClassModal.less'

const itemProps = { labelCol: { span: 5 }, wrapperCol: { span: 19 } }

const CreateClassModal = ({ stepModal, mask, profile = {}, ...props }) => (
  <Modal
    {...props}
    mask={mask}
    onCancel={props.close(props.onCancel)}
    onOk={props.handleSubmit}
    title='Create A Class'>
    <form>
      <Field
        {...props}
        itemProps={itemProps}
        label='Class name'
        name='displayName'
        placeholder={`${profile.displayName}'s Class`}
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
      <div style={{ textAlign: 'center', fontSize: 12 }}>
        <a onClick={stepModal.next}>
          <Icon type='plus' />&ensp;Find a Class to Join
        </a>
      </div>
    )}
  </Modal>
)

CreateClassModal.propTypes = {}

export default enhancer(CreateClassModal)
