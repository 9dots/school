import Field, { SelectField } from 'components/Field'
import { filterByLabel } from 'utils'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import enhancer from './enhancer'
import React from 'react'

import './AddStudentModal.less'

const AddStudentModal = ({
  studentList = [],
  handleSubmit,
  stepModal,
  onCancel,
  ...props
}) => {
  return (
    <Modal
      {...props}
      onCancel={onCancel}
      onOk={handleSubmit}
      title='Add a Student to Your Class'>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '24px 50px 0' }}>
          <Field
            {...props}
            name='student'
            placeholder='Find a someone in your school...'
            filterOption={filterByLabel}
            options={studentList.map(s => ({
              value: s.id,
              label: s.displayName
            }))}
            showSearch
            component={SelectField} />
        </div>
        {stepModal && (
          <div
            style={{ textAlign: 'center', fontSize: 12, fontStyle: 'italic' }}>
            <a onClick={stepModal.next}>
              I can&apos;t find my student. Create a new student account
              instead.
            </a>
          </div>
        )}
      </form>
    </Modal>
  )
}

AddStudentModal.propTypes = {}

export default enhancer(AddStudentModal)
