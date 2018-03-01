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
    dataIndex: 'student',
    sorter: (a, b) => alphaSort(a.student, b.student)
  },
  {
    title: 'Last',
    key: 'last',
    dataIndex: 'student',
    sorter: (a, b) => alphaSort(a.student, b.student)
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
    sorter: (a, b) => a.progress - b.progress,
    render: ({ progress }) => (
      <span>
        <Progress style={{ minWidth: 180 }} percent={progress} />
      </span>
    )
  }
]

function alphaSort (a, b) {
  let nameA = a.toLowerCase()
  let nameB = b.toLowerCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1
  return 0
}
