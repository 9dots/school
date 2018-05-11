import Field, { SelectField } from 'components/Field'
import { Modal, Icon } from 'antd'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'
import './JoinClassModal.less'

const JoinClassModal = ({
  onCancel,
  handleSubmit,
  stepModal,
  classes = [],
  ...rest
}) => {
  return (
    <Modal
      {...rest}
      onOk={handleSubmit}
      onCancel={onCancel}
      title='Join A Class'>
      <form onSubmit={handleSubmit}>
        <div style={{ padding: '20px 50px 0' }}>
          <Field
            {...rest}
            showSearch
            name='class'
            placeholder='Find a class...'
            optionFilterProp='label'
            component={SelectField}
            options={classes.map(c => ({ label: c.displayName, value: c.id }))}
            style={{ width: '100%' }} />
        </div>
        {stepModal && (
          <div style={{ textAlign: 'center', fontSize: 12 }}>
            <a onClick={stepModal.next}>
              <Icon type='plus' />&ensp;Create a New Class
            </a>
          </div>
        )}
      </form>
    </Modal>
  )
}

JoinClassModal.propTypes = {}

export default enhancer(JoinClassModal)
