import PropTypes from 'prop-types'
import React from 'react'
import { Table, Progress } from 'antd'
import './ProgressTable.less'

const ProgressTable = ({ data }) => {
  return (
    <Table
      className='progress-table'
      pagination={false}
      rowKey={({ student }) => student}
      columns={columns}
      dataSource={data} />
  )
}

ProgressTable.propTypes = {}

export default ProgressTable

const columns = [
  {
    title: 'First',
    key: 'first',
    dataIndex: 'student'
  },
  {
    title: 'Last',
    key: 'last',
    dataIndex: 'student'
  },
  {
    title: 'Work',
    key: 'link',
    render: ({ url }) => (
      <div style={{ minWidth: 70 }}>
        <a href={url}>View Work</a>
      </div>
    )
  },
  {
    title: 'Progress',
    key: 'progress',
    render: ({ progress }) => (
      <span>
        <Progress style={{ minWidth: 180 }} percent={progress} />
      </span>
    )
  }
]
