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
        <Field
          {...props}
          itemProps={{ style: { margin: '24px 24px 14px' } }}
          name='school'
          showSearch
          placeholder='Select a School'
          options={props.schools}
          optionFilterProp='label'
          notFoundContent='No schools to join'
          component={SelectField} />
      </Form>
      {/* <div style={{ textAlign: 'center' }}>
        <a>My School is not listed. Create new school.</a>
      </div> */}
    </Modal>
  )
}

SchoolModal.propTypes = {}

export default enhancer(SchoolModal)
