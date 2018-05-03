import Field, { SelectField } from 'components/Field'
import { Modal, Form } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './SchoolModal.less'

const SchoolModal = props => {
  if (!props.isLoaded) return <span />
  return (
    <Modal
      visible
      title='Join A School'
      onCancel={props.close(props.onCancel)}
      confirmLoading={props.confirmLoading}
      onOk={props.handleSubmit}>
      <Form>
        <Form.Item>
          <Field
            {...props}
            name='school'
            placeholder='Select a School'
            options={props.schools}
            notFoundContent='No schools to join'
            component={SelectField} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

SchoolModal.propTypes = {}

export default enhancer(SchoolModal)
