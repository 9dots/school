import { Link } from 'react-router-dom'
import { Table, Progress } from 'antd'
import PropTypes from 'prop-types'
import getProp from '@f/get-prop'
import React from 'react'

import './ProgressTable.less'

const ProgressTable = ({ data, moduleId }) => {
  return (
    <Table
      className='progress-table'
      pagination={false}
      rowKey={(_, i) => i}
      columns={columns(moduleId)}
      dataSource={data} />
  )
}

ProgressTable.propTypes = {}

export default ProgressTable

const columns = (moduleId, cls) => [
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
    render: ({ class: cls, studentData, lesson, index = 0, ...rest }) => (
      <div style={{ minWidth: 70 }}>
        <Link
          to={`/class/${cls}/module/${moduleId}/lesson/${lesson}/${index}/${
            studentData.id
          }`}>
          View Work
        </Link>
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
