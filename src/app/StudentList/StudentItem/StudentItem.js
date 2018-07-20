import { Progress, Popover, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import { getTaskTitle } from 'utils'
import React from 'react'

import './StudentItem.less'

const StudentItem = ({
  studentProgress = {},
  deleteStudent,
  tasks = [],
  moduleId,
  uid
}) => {
  const { student, progress = [] } = studentProgress
  const { displayName } = student

  const idx = progress.findIndex((p, i) => p.active)
  const active = idx > -1 ? progress[idx] : false
  const path = active
    ? `/class/${active.class}/module/${moduleId}/lesson/${
      active.lesson
    }/${idx}/${uid}`
    : ''

  const title = (
    <div style={{ textAlign: 'center', padding: 7 }}>
      <h3>{displayName}</h3>
      <Link disabled={!active} to={path}>
        View Work
      </Link>
    </div>
  )

  const content = tasks.length ? (
    <div>
      {progress.map(task => {
        const { id, progress: percent } = task
        return (
          <Row
            key={id}
            type='flex'
            align='center'
            style={{ padding: '10px 0' }}>
            <Col className='ellipsis flex-grow' style={{ paddingRight: 20 }}>
              {getTaskTitle(task)}
            </Col>
            <Col>
              <Progress type='circle' width={30} percent={percent} />
            </Col>
          </Row>
        )
      })}
    </div>
  ) : (
    <div style={{ textAlign: 'center', padding: 10 }}>No Lesson Assigned</div>
  )

  return (
    <Popover
      placement='leftTop'
      title={title}
      overlayClassName='student-popover'
      content={content}
      trigger='click'>
      <Row
        type='flex'
        align='middle'
        style={{ height: 40 }}
        justify='space-between'
        className='student-item'>
        <Col>
          <div>{displayName}</div>
          {active && (
            <div className='meta'>
              {idx + 1}.&emsp;{getTaskTitle(active)}
            </div>
          )}
        </Col>
      </Row>
    </Popover>
  )
}

StudentItem.propTypes = {}

export default enhancer(StudentItem)
