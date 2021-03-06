import { Progress, Popover, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { getTaskTitle } from 'utils'
import PropTypes from 'prop-types'
import enhancer from './enhancer'
import React from 'react'

import './StudentItem.less'

function getActive (studentProgress) {
  const {
    student: { activeTask },
    progress,
    active
  } = studentProgress

  if (activeTask) return activeTask
  if (active) return progress.find(task => task.id === active)
  return undefined
}

const StudentItem = ({ studentProgress = {}, tasks = [], class: cls, uid }) => {
  const { student, progress = [] } = studentProgress
  const { displayName } = student
  const active = getActive(studentProgress)

  const idx = active ? active.index : undefined

  const path = active
    ? `/class/${cls.id}/module/${active.module}/lesson/${
      active.lesson
    }/${idx}/${uid}`
    : ''

  const title = (
    <div style={{ textAlign: 'center', padding: 7 }}>
      <h3>{displayName}</h3>
      <a
        rel='noopener noreferrer'
        disabled={!active}
        target='_blank'
        href={path}>
        View Work
      </a>
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
