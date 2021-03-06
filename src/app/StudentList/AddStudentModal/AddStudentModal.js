import { Modal, Divider, Row, Col, Select, Button } from 'antd'
import Field, { SelectField } from 'components/Field'
import PropTypes from 'prop-types'

import enhancer from './enhancer'
import React from 'react'

import './AddStudentModal.less'

const AddStudentModal = ({
  studentList = [],
  handleSubmit,
  stepModal,
  parseCsv,
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
            placeholder='Find someone in your school...'
            component={SelectField}
            optionLabelProp='label'
            filterOption={filter}
            showSearch>
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
          <div style={{ paddingBottom: 20 }}>
            <Divider style={{ padding: '4px 100px 16px' }}>OR</Divider>
            <Row type='flex' gutter={16} justify='center'>
              <Col>
                <Button
                  style={{ float: 'left' }}
                  className='secondary'
                  type='primary'
                  onClick={() => document.getElementById('csv').click()}
                  icon='upload'
                  ghost>
                  Upload Spreadsheet
                  <input
                    hidden
                    onChange={parseCsv}
                    id='csv'
                    name='csv'
                    accept='.csv, .xls, .xlsx'
                    type='file' />
                </Button>
              </Col>
              <Col>
                <Button
                  icon='user-add'
                  type='primary'
                  ghost
                  onClick={stepModal.next}>
                  Create New Student
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </form>
    </Modal>
  )
}

AddStudentModal.propTypes = {}

export default enhancer(AddStudentModal)

const Option = ({ student }) => {
  const { email, displayName } = student
  return (
    <span>
      {email ? (
        <Row type='flex'>
          <Col span={14}>{displayName}</Col>
          <Col
            span={10}
            className='ellipsis'
            style={{ fontFamily: 'monospace' }}>
            ID:&ensp;{email}
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
