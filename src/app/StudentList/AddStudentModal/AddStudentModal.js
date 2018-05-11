import Field, { SelectField } from 'components/Field'
import PropTypes from 'prop-types'
import { Modal, Icon, Row, Col, Select } from 'antd'
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
            optionLabelProp='label'
            filterOption={filter}
            showSearch
            component={SelectField}>
            {studentList.map(s => (
              <Select.Option
                studentId={s.studentId}
                label={s.displayName}
                value={s.id}
                key={s.id}>
                <Option student={s} />
              </Select.Option>
            ))}
          </Field>
        </div>
        {stepModal && (
          <div style={{ textAlign: 'center', fontSize: 12 }}>
            <a onClick={stepModal.next}>
              <Icon type='plus' />&ensp;Create a New Student Account
            </a>
          </div>
        )}
      </form>
    </Modal>
  )
}

AddStudentModal.propTypes = {}

export default enhancer(AddStudentModal)

const Option = ({ student }) => {
  const { studentId, displayName } = student
  return (
    <span>
      {studentId ? (
        <Row type='flex'>
          <Col span={15}>{displayName}</Col>
          <Col span={9} style={{ fontFamily: 'monospace' }}>
            ID:&ensp;{studentId}
          </Col>
        </Row>
      ) : (
        displayName
      )}
    </span>
  )
}

function filter (inputVal, { props: { label = '', studentId = '' } }) {
  return (
    (label + ' ' + studentId).toLowerCase().indexOf(inputVal.toLowerCase()) > -1
  )
}
