import { Modal, Table, Button } from 'antd'
import Field, { TextField } from 'components/Field'
import enhancer from './enhancer'
import PropTypes from 'prop-types'
import getProp from '@f/get-prop'
import mapValues from '@f/map-values'
import React from 'react'
import './DisplaySheet.less'

const DisplaySheet = ({ data, className, ...rest }) => {
  return (
    <Modal
      className={`upload-sheet ${className}`}
      title='Create/Add Students'
      okText={`Add ${Object.keys(data).length} Students`}
      maskClosable={false}
      closable={false}
      width={900}
      visible
      {...rest}
      onOk={rest.handleSubmit}>
      <Table
        showHeader
        bordered
        pagination={false}
        rowKey={(_, i) => i.toString()}
        dataSource={mapValues((v, key) => ({ key, ...v }), rest.values)}
        columns={columns(rest)} />
    </Modal>
  )
}

const columns = props => [
  {
    title: 'First Name',
    key: 'firstName',
    dataIndex: 'name.given',
    render: (text, data, index) => (
      <TableInput type='name.given' text={text} data={data} {...props} />
    )
  },
  {
    title: 'Last Name',
    key: 'lastName',
    dataIndex: 'name.family',
    render: (text, data, index) => (
      <TableInput type='name.family' text={text} data={data} {...props} />
    )
  },
  {
    title: 'Student ID',
    key: 'studentId',
    dataIndex: 'studentId',
    render: (text, data, index) => (
      <TableInput type='studentId' text={text} data={data} {...props} />
    )
  },
  {
    title: 'Email',
    key: 'email',
    dataIndex: 'email',
    className: 'email-col',
    render: (text, data, index) => (
      <TableInput type='email' text={text} data={data} {...props} />
    )
  },
  {
    key: 'actions',
    className: 'row-actions-col',
    render: (_, data) => (
      <div className='row-actions'>
        <Button
          icon='delete'
          type='primary'
          ghost
          onClick={() => props.removeRow(data.key)} />
      </div>
    )
  }
]

DisplaySheet.propTypes = {}

export default enhancer(DisplaySheet)

const TableInput = ({
  text,
  data,
  type,
  setFieldValue,
  handleSubmit,
  setFieldTouched,
  submitCount,
  isValid,
  touched,
  values,
  errors
}) => {
  return (
    <Field
      errors={errors}
      scrollOnError={`${data.key}.${type}`}
      setFieldTouched={setFieldTouched}
      submitCount={submitCount}
      touched={touched}
      isValid={isValid}
      setFieldValue={setFieldValue}
      handleSubmit={() => {}}
      name={`${data.key}.${type}`}
      values={values}
      component={TextField} />
  )
}
