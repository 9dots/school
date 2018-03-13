import PropTypes from 'prop-types'
import React from 'react'
import getProp from '@f/get-prop'
import { Table, Progress } from 'antd'
import './ProgressTable.less'

const ProgressTable = ({ data }) => {
  return (
    <Table
      className='progress-table'
      pagination={false}
      rowKey={(data, i) => i}
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
    dataIndex: 'studentData.name.given',
    sorter: (a, b) => alphaSort(a, b, 'studentData.name.given')
  },
  {
    title: 'Last',
    key: 'last',
    dataIndex: 'studentData.name.family',
    sorter: (a, b) => alphaSort(a, b, 'studentData.name.family')
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

function alphaSort (a, b, selector) {
  let nameA = getProp(selector, a).toLowerCase()
  let nameB = getProp(selector, b).toLowerCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1
  return 0
}
