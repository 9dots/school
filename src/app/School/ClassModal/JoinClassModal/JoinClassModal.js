import Field, { SelectField } from 'components/Field'
import { filterByLabel } from 'utils'
import { Modal } from 'antd'
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
        <div style={{ padding: '20px 50px 30px' }}>
          <Field
            {...rest}
            showSearch
            name='class'
            placeholder='Find a class...'
            filterOption={filterByLabel}
            component={SelectField}
            options={classes.map(c => ({ label: c.displayName, value: c.id }))}
            style={{ width: '100%' }} />
        </div>
        {stepModal && (
          <div
            style={{ textAlign: 'center', fontSize: 12, fontStyle: 'italic' }}>
            <a onClick={stepModal.next}>
              My class is not listed. Create a new class.
            </a>
          </div>
        )}
      </form>
    </Modal>
  )
}

JoinClassModal.propTypes = {}

export default enhancer(JoinClassModal)
