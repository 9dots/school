import Field, { SelectField } from 'components/Field'
import PropTypes from 'prop-types'
import { Modal, Icon, Row, Col, Select, Button } from 'antd'
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
      // footer={
      //   <span>
      //     <Button
      //       style={{ float: 'left' }}
      //       className='secondary'
      //       type='primary'
      //       ghost>
      //       Upload Spreadsheet
      //     </Button>
      //     <Button key='back' onClick={onCancel}>
      //       Cancel
      //     </Button>
      //     <Button
      //       key='submit'
      //       type='primary'
      //       loading={props.confirmLoading}
      //       onClick={handleSubmit}>
      //       Submit
      //     </Button>
      //   </span>
      // }
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
          <Col span={14}>{displayName}</Col>
          <Col
            span={10}
            className='ellipsis'
            style={{ fontFamily: 'monospace' }}>
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
